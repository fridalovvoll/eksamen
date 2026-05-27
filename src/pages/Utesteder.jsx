import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Utesteder() {
  const [valgtBy, setValgtBy] = useState("");
  const [valgtVibe, setValgtVibe] = useState("");
  const [valgtMusikk, setValgtMusikk] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [steder, setSteder] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    async function hentSteder() {
      const querySnapshot = await getDocs(collection(db, "steder"));
      const liste = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSteder(liste);
    }

    hentSteder();
  }, []);

  const byer = [...new Set(steder.map((sted) => sted.By).filter(Boolean))];
  const viber = [...new Set(steder.flatMap((sted) => sted.Vibe || []))];
  const musikkTyper = [...new Set(steder.flatMap((sted) => sted.Musikk || []))];

  const filtrerteSteder = steder.filter((sted) => {
    const passerBy = valgtBy === "" || sted.By === valgtBy;
    const passerVibe = valgtVibe === "" || sted.Vibe?.includes(valgtVibe);
    const passerMusikk = valgtMusikk === "" || sted.Musikk?.includes(valgtMusikk);

    return passerBy && passerVibe && passerMusikk;
  });

  function nullstill() {
    setValgtBy("");
    setValgtVibe("");
    setValgtMusikk("");
  }

  function FilterPanel({ type }) {
    return (
      <div style={filterPanelStyle}>
        <h2 style={overskriftStyle}>BYER</h2>
        {byer.map((by) => (
          <label key={by} style={labelStyle}>
            <input
              type="radio"
              name={`by-${type}`}
              checked={valgtBy === by}
              onChange={() => setValgtBy(by)}
            />
            {" "}{by}
          </label>
        ))}

        <h2 style={overskriftStyle}>VIBE</h2>
        {viber.map((vibe) => (
          <label key={vibe} style={labelStyle}>
            <input
              type="radio"
              name={`vibe-${type}`}
              checked={valgtVibe === vibe}
              onChange={() => setValgtVibe(vibe)}
            />
            {" "}{vibe}
          </label>
        ))}

        <h2 style={overskriftStyle}>MUSIKK</h2>
        {musikkTyper.map((musikk) => (
          <label key={musikk} style={labelStyle}>
            <input
              type="radio"
              name={`musikk-${type}`}
              checked={valgtMusikk === musikk}
              onChange={() => setValgtMusikk(musikk)}
            />
            {" "}{musikk}
          </label>
        ))}

        <button onClick={nullstill} style={nullstillKnappStyle}>
          Nullstill filter
        </button>
      </div>
    );
  }

  return (
    <div style={sideStyle}>
      <style>{`
        .utesteder-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .desktop-filter {
          display: block;
        }

        .mobil-filter-knapp {
          display: none;
        }

        .mobil-filter-panel {
          display: none;
        }

        @media (max-width: 1100px) {
          .utesteder-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .utesteder-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .desktop-filter {
            display: none;
          }

          .mobil-filter-knapp {
            display: block;
          }

          .mobil-filter-panel {
            display: block;
            margin-bottom: 20px;
          }
        }
      `}</style>

      <div style={layoutStyle}>
        <div className="desktop-filter">
          <FilterPanel type="desktop" />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={titelStyle}>Utesteder</h1>

          <button
            className="mobil-filter-knapp"
            onClick={() => setFilterOpen(!filterOpen)}
            style={mobilFilterKnappStyle}
          >
            {filterOpen ? "Skjul filter ▲" : "Vis filter ▼"}
          </button>

          {filterOpen && (
            <div className="mobil-filter-panel">
              <FilterPanel type="mobil" />
            </div>
          )}

          {valgtBy === "" && (
            <p style={ingenValgStyle}>
              Velg by, vibe og musikk – finn stedet som passer deg ✨
            </p>
          )}

          {valgtBy !== "" && (
            <h2 style={valgtByStyle}>
              Utesteder i {valgtBy}
            </h2>
          )}

          <div className="utesteder-grid">
            {filtrerteSteder.map((sted, index) => (
              <div
                key={sted.id}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "20px",
                  padding: "14px",
                  boxShadow:
                    hoverIndex === index
                      ? "0 0 35px rgba(255,0,184,0.45)"
                      : "0 0 18px rgba(108,99,255,0.18)",
                  backdropFilter: "blur(8px)",
                  transform: hoverIndex === index ? "scale(1.03)" : "scale(1)",
                  transition: "0.25s ease",
                  cursor: "pointer",
                }}
              >
                <img
                  src={sted.Bilde}
                  alt={sted.navn}
                  style={bildeStyle}
                />

                <h3 style={kortTittelStyle}>
                  {sted.navn}
                </h3>

                <p style={kortInfoStyle}>
                  {sted.Vibe?.join(" • ")} • {sted.Musikk?.join(" • ")}
                </p>

                <p style={kortTekstStyle}>
                  {sted.Beskrivelse}
                </p>
              </div>
            ))}
          </div>

          {valgtBy !== "" && filtrerteSteder.length === 0 && (
            <p style={ingenResultatStyle}>
              Ingen utesteder passer med valgene dine.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const sideStyle = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at 25% 35%, rgba(255,0,184,0.22), transparent 35%), radial-gradient(circle at 75% 75%, rgba(0,170,255,0.18), transparent 35%), #030512",
  color: "white",
  fontFamily: "Arial, sans-serif",
  padding: "40px 24px",
  boxSizing: "border-box",
};

const layoutStyle = {
  display: "flex",
  gap: "40px",
  alignItems: "flex-start",
  maxWidth: "1200px",
  margin: "0 auto",
};

const filterPanelStyle = {
  width: "210px",
  minWidth: "210px",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "20px",
  padding: "20px",
  background: "rgba(255,255,255,0.04)",
  boxShadow: "0 0 20px rgba(255,0,184,0.18)",
  backdropFilter: "blur(8px)",
  boxSizing: "border-box",
};

const titelStyle = {
  fontSize: "40px",
  marginTop: "0",
  marginBottom: "16px",
  color: "#b8a7ff",
  textShadow: "0 0 16px #6c63ff",
};

const ingenValgStyle = {
  fontSize: "20px",
  color: "#c9c4ff",
  textAlign: "center",
  marginTop: "80px",
};

const overskriftStyle = {
  fontSize: "18px",
  fontWeight: "800",
  color: "#b8a7ff",
  textShadow: "0 0 10px #6c63ff",
  marginTop: "24px",
  marginBottom: "12px",
};

const labelStyle = {
  display: "block",
  fontSize: "15px",
  marginBottom: "8px",
  cursor: "pointer",
};

const nullstillKnappStyle = {
  marginTop: "20px",
  padding: "9px 14px",
  borderRadius: "18px",
  border: "none",
  background: "#ff00b8",
  color: "white",
  fontWeight: "bold",
  fontSize: "13px",
  cursor: "pointer",
  width: "100%",
};

const mobilFilterKnappStyle = {
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "white",
  padding: "10px 18px",
  borderRadius: "14px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  marginBottom: "16px",
  width: "100%",
};

const valgtByStyle = {
  fontSize: "20px",
  marginBottom: "20px",
  fontWeight: "600",
};

const bildeStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "16px",
  boxShadow: "0 0 20px rgba(255,0,184,0.25)",
};

const kortTittelStyle = {
  fontSize: "22px",
  fontWeight: "800",
  marginTop: "12px",
  marginBottom: "6px",
};

const kortInfoStyle = {
  color: "#c9c4ff",
  fontSize: "15px",
  fontWeight: "600",
  marginBottom: "10px",
};

const kortTekstStyle = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "rgba(255,255,255,0.92)",
  margin: 0,
};

const ingenResultatStyle = {
  fontSize: "18px",
  marginTop: "30px",
  color: "#c9c4ff",
};