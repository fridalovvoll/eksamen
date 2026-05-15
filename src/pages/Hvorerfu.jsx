import { useState } from "react";
import styled from "styled-components";
import VenueCard from "../components/VenueCard";


/* ---------------- INITIAL DATA ---------------- */

const initialVenues = {
  Tromsø: [
  { title: "Heidis Bier Bar Tromsø", votes: 0, image: "/bilder/heidis.jpg" },
  { title: "No Stress", votes: 0, image: "/bilder/no stress.jpg" },
  { title: "Solid", votes: 0, image: "/bilder/solid.jpg" },
  { title: "Verdensteateret", votes: 0, image: "/bilder/verdensteateret.jpg" },
  { title: "Kaia", votes: 0, image: "/bilder/kaia.jpg" },
  { title: "Skins", votes: 0, image: "/bilder/skins.jpeg"},
],

  Oslo: [
    { title: "Jaeger", votes: 0, image: "/bilder/jaeger.jpg" },
    { title: "The Villa", votes: 0, image: "/bilder/the villa.jpg" },
    { title: "Nox", votes: 0, image: "/bilder/nox.jpg" },
    { title: "Kulturhuset", votes: 0, image: "/bilder/kulturhuset.jpg" },
    { title: "Blå", votes: 0, image: "/bilder/bla.jpg" },
    { title: "Ingensteds", votes: 0, image: "/bilder/ingensteds.webp" },
  ],
  
  Bergen: [
    { title: "Lille", votes: 0, image: "/bilder/lille.png" },
    { title: "Kvarteret", votes: 0, image: "/bilder/kvarteret.jpeg" },
    { title: "Østre", votes: 0, image: "/bilder/ostre.jpeg" },
    { title: "Fincken", votes: 0, image: "/bilder/fincken.jpg" },
    { title: "Apollon", votes: 0, image: "/bilder/apollo.jpg" },
    { title: "Heidis Bier Bar Bergen", votes: 0, image: "/bilder/heidis bergen.jpeg" },
  ],
  Trondheim: [
    { title: "Lokal Bar", votes: 0, image: "/bilder/lokal bar.jpeg" },
    { title: "Diskoteket", votes: 0, image: "/bilder/diskoteket.jpeg" },
    { title: "Samfundet", votes: 0, image: "/bilder/samfundet.jpg" },
    { title: "BrukBar", votes: 0, image: "/bilder/brukbar.avif" },
    { title: "Tyven", votes: 0, image: "/bilder/tyven.jpg" },
    { title: "Heidis Bier Bar Trondheim", votes: 0, image: "/bilder/heidis trondheim.jpeg" },
  ],
};

/* ---------------- HELPER: STATUS BASERT PÅ STEMMER ---------------- */

function getStatus(votes) {
  if (votes >= 10) return { color: "red", text: "Fullt" };
  if (votes >= 5) return { color: "yellow", text: "Passe" };
  return { color: "green", text: "Rolig" };
}

/* ---------------- KOMPONENT ---------------- */

function Login() {
  const [venues, setVenues] = useState(initialVenues);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  /* STEMMEFUNKSJON */
  function addVote(city, index) {
    const updated = { ...venues };
    updated[city][index].votes += 1;
    setVenues(updated);
  }

  /* FILTRERING */
  const getFilteredVenues = () => {
    if (!selectedCity) return [];

    let list = venues[selectedCity];

    if (!searchTerm.trim()) return list;

    return list.filter((v) =>
      v.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredVenues = getFilteredVenues();

  return (
    <PageWrapper>
      <TopSection>
        <Title>HVOR ER FU I KVELD?</Title>

        <Input
          placeholder="Søk etter utested..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </TopSection>

      <ContentWrapper>
        {/* VENSTRE SIDE – BYER */}
        <CityBox>
          <h3>BYER</h3>

          {Object.keys(venues).map((city) => (
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
        </CityBox>

        {/* HØYRE SIDE – KORT */}
        <CardsWrapper>
          {!selectedCity && (
            <p style={{ gridColumn: "1 / -1", opacity: 0.7 }}>
              Velg en by for å se utesteder ✨
            </p>
          )}

          {selectedCity && filteredVenues.length === 0 && (
            <p style={{ gridColumn: "1 / -1", opacity: 0.7 }}>
              Ingen utesteder matcher søket ditt.
            </p>
          )}

          {selectedCity &&
            filteredVenues.map((venue, index) => {
              const status = getStatus(venue.votes);

              return (
                <VenueCard
  key={index}
  title={venue.title}
  votes={venue.votes}
  statusColor={status.color}
  statusText={status.text}
  onVote={() => addVote(selectedCity, index)}
  image={venue.image}
/>

              );
            })}
        </CardsWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default Login;

/* ---------------- STYLING ---------------- */

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
    letter-spacing: 1px;
    margin-bottom: 15px;
    text-transform: uppercase;
    color: #b8a7ff;
    text-shadow: 0 0 10px rgba(108, 99, 255, 0.4);
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 6px 0;
    font-size: 1.1rem;
    font-weight: 500;
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
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);

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
  transition: 0.2s ease;

  &:hover {
    background: #ff33cc;
    box-shadow: 0 0 15px rgba(255, 0, 184, 0.6);
  }
`;


