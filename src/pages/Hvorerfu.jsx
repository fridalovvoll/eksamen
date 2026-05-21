import { useEffect, useState } from "react";
import styled from "styled-components";
import VenueCard from "../components/Venuecard";
import { collection, getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

function getDagensKey() {
  const now = new Date();

  // Før kl 04 teller fortsatt som gårsdagens kveld
  if (now.getHours() < 4) {
    now.setDate(now.getDate() - 1);
  }

  return now.toISOString().split("T")[0];
}

function getStatus(votes) {
  if (votes >= 10) return { color: "red", text: "Fullt" };
  if (votes >= 5) return { color: "yellow", text: "Passe" };
  return { color: "green", text: "Rolig" };
}

function HvorErFu() {
  const [steder, setSteder] = useState([]);
  const [stemmer, setStemmer] = useState([]);
  const [bruker, setBruker] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dagensKey = getDagensKey();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setBruker(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function hentData() {
      const stederSnapshot = await getDocs(collection(db, "steder"));

      const stederListe = stederSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSteder(stederListe);

      const stemmerSnapshot = await getDocs(collection(db, "stemmer"));

      const stemmerListe = stemmerSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((stemme) => stemme.dato === dagensKey);

      setStemmer(stemmerListe);
    }

    hentData();
  }, [dagensKey]);

  const byer = [...new Set(steder.map((sted) => sted.By).filter(Boolean))];

  const filtrerteSteder = steder.filter((sted) => {
    const passerBy = selectedCity && sted.By === selectedCity;
    const passerSok = sted.navn
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return passerBy && passerSok;
  });

  function tellStemmerForSted(stedId) {
    return stemmer.filter((stemme) => stemme.stedId === stedId).length;
  }

  function brukerHarStemtPå(stedId) {
    return stemmer.some(
      (stemme) => stemme.uid === bruker?.uid && stemme.stedId === stedId
    );
  }

  async function stemPåSted(sted) {
    if (!bruker) {
      alert("Du må være logget inn for å stemme.");
      return;
    }

    // Samme dokument-ID hver dag per bruker
    const stemmeId = `${dagensKey}_${bruker.uid}`;

    const nyStemme = {
      uid: bruker.uid,
      email: bruker.email,
      stedId: sted.id,
      stedNavn: sted.navn,
      by: sted.By,
      dato: dagensKey,
      createdAt: new Date(),
    };

    // setDoc gjør at brukeren kan endre sted
    await setDoc(doc(db, "stemmer", stemmeId), nyStemme);

    setStemmer((gamleStemmer) => {
      const utenMinGamle = gamleStemmer.filter(
        (stemme) => stemme.uid !== bruker.uid
      );

      return [
        ...utenMinGamle,
        {
          id: stemmeId,
          ...nyStemme,
        },
      ];
    });
  }

  async function draHjem() {
    if (!bruker) return;

    const stemmeId = `${dagensKey}_${bruker.uid}`;

    await deleteDoc(doc(db, "stemmer", stemmeId));

    setStemmer((gamleStemmer) =>
      gamleStemmer.filter((stemme) => stemme.uid !== bruker.uid)
    );
  }

  return (
    <PageWrapper>
      <TopSection>
        <Title>HVOR ER FU I KVELD?</Title>

        <Input
          placeholder="Søk etter utested..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {bruker ? (
          <LoggedInText>Logget inn som {bruker.email}</LoggedInText>
        ) : (
          <LoggedInText>Logg inn for å stemme</LoggedInText>
        )}
      </TopSection>

      <ContentWrapper>
        <CityBox>
          <h3>BYER</h3>

          {byer.map((city) => (
            <label key={city}>
              <input
                type="radio"
                name="city"
                checked={selectedCity === city}
                onChange={() => setSelectedCity(city)}
              />
              {city}
            </label>
          ))}

          <ResetButton onClick={() => setSelectedCity(null)}>
            Nullstill by
          </ResetButton>

          <HomeButton onClick={draHjem}>Dra hjem</HomeButton>
        </CityBox>

        <CardsWrapper>
          {!selectedCity && (
            <p style={{ gridColumn: "1 / -1", opacity: 0.7 }}>
              Velg en by for å se utesteder ✨
            </p>
          )}

          {selectedCity && filtrerteSteder.length === 0 && (
            <p style={{ gridColumn: "1 / -1", opacity: 0.7 }}>
              Ingen utesteder matcher søket ditt.
            </p>
          )}

          {selectedCity &&
            filtrerteSteder.map((sted) => {
              const votes = tellStemmerForSted(sted.id);
              const status = getStatus(votes);
              const harStemtHer = brukerHarStemtPå(sted.id);

              return (
                <VenueCard
                  key={sted.id}
                  title={sted.navn}
                  votes={votes}
                  statusColor={status.color}
                  statusText={harStemtHer ? "Du er her" : status.text}
                  onVote={() => stemPåSted(sted)}
                  image={sted.Bilde}
                />
              );
            })}
        </CardsWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default HvorErFu;

const PageWrapper = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at 25% 35%, rgba(255, 0, 184, 0.22), transparent 35%),
    radial-gradient(circle at 75% 75%, rgba(0, 170, 255, 0.18), transparent 35%),
    #030512;
  color: white;
  font-family: "Arial", sans-serif;
  padding: 60px;
`;

const TopSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 55px;
  margin-bottom: 15px;
  color: #b8a7ff;
  text-shadow: 0 0 20px #6c63ff;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 60px;
`;

const CityBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 25px;
  border-radius: 20px;
  width: 220px;
  backdrop-filter: blur(8px);

  h3 {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 15px;
    text-transform: uppercase;
    color: #b8a7ff;
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    font-size: 1.1rem;
    cursor: pointer;
  }
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  flex: 1;
`;

const Input = styled.input`
  width: 60%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.08);
  color: white;

  &::placeholder {
    color: #c9c4ff;
  }
`;

const ResetButton = styled.button`
  margin-top: 15px;
  padding: 10px 14px;
  border-radius: 20px;
  border: none;
  background: #ff00b8;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const HomeButton = styled.button`
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 20px;
  border: none;
  background: #00e1ff;
  color: #030512;
  font-weight: bold;
  cursor: pointer;
`;

const LoggedInText = styled.p`
  color: #c9c4ff;
  margin-top: 12px;
`;