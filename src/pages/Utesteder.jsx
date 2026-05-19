import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Utesteder() {
  const [valgtBy, setValgtBy] = useState("");
  const [valgtVibe, setValgtVibe] = useState("");
  const [valgtMusikk, setValgtMusikk] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [steder, setSteder] = useState([]);

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

  // Lager filtervalg automatisk fra Firebase-data
  const byer = [...new Set(steder.map((sted) => sted.By).filter(Boolean))];

  const viber = [
    ...new Set(steder.flatMap((sted) => sted.Vibe || [])),
  ];

  const musikkTyper = [
    ...new Set(steder.flatMap((sted) => sted.Musikk || [])),
  ];

  const filtrerteSteder = steder.filter((sted) => {
    const passerBy = valgtBy !== "" && sted.By === valgtBy;
    const passerVibe = valgtVibe === "" || sted.Vibe?.includes(valgtVibe);
    const passerMusikk =
      valgtMusikk === "" || sted.Musikk?.includes(valgtMusikk);

    return passerBy && passerVibe && passerMusikk;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 25% 35%, rgba(255,0,184,0.22), transparent 35%), radial-gradient(circle at 75% 75%, rgba(0,170,255,0.18), transparent 35%), #030512",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "55px",
      }}
    >
      <div style={{ display: "flex", gap: "50px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "210px",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "20px",
            padding: "25px",
            background: "rgba(255,255,255,0.04)",
            boxShadow: "0 0 20px rgba(255,0,184,0.18)",
            backdropFilter: "blur(8px)",
          }}
        >
          <h2 style={overskriftStyle}>BYER</h2>

          {byer.map((by) => (
            <label key={by} style={labelStyle}>
              <input
                type="radio"
                name="by"
                checked={valgtBy === by}
                onChange={() => setValgtBy(by)}
              />{" "}
              {by}
            </label>
          ))}

          <h2 style={overskriftStyle}>VIBE</h2>

          {viber.map((vibe) => (
            <label key={vibe} style={labelStyle}>
              <input
                type="radio"
                name="vibe"
                checked={valgtVibe === vibe}
                onChange={() => setValgtVibe(vibe)}
              />{" "}
              {vibe}
            </label>
          ))}

          <h2 style={overskriftStyle}>MUSIKK</h2>

          {musikkTyper.map((musikk) => (
            <label key={musikk} style={labelStyle}>
              <input
                type="radio"
                name="musikk"
                checked={valgtMusikk === musikk}
                onChange={() => setValgtMusikk(musikk)}
              />{" "}
              {musikk}
            </label>
          ))}

          <button
            onClick={() => {
              setValgtBy("");
              setValgtVibe("");
              setValgtMusikk("");
            }}
            style={{
              marginTop: "25px",
              padding: "9px 14px",
              borderRadius: "18px",
              border: "none",
              background: "#ff00b8",
              color: "white",
              fontWeight: "bold",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Nullstill filter
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "46px",
              marginTop: "0px",
              marginBottom: "10px",
              color: "#b8a7ff",
              textShadow: "0 0 16px #6c63ff",
            }}
          >
            Utesteder
          </h1>

          {valgtBy === "" && (
            <p
              style={{
                fontSize: "24px",
                color: "#c9c4ff",
                textAlign: "center",
                width: "100%",
                marginTop: "120px",
              }}
            >
              Velg by, vibe og musikk - finn stedet som passer deg✨
            </p>
          )}

          {valgtBy !== "" && (
            <h2
              style={{
                fontSize: "22px",
                marginBottom: "28px",
                fontWeight: "600",
              }}
            >
              Utesteder i {valgtBy}
            </h2>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 300px)",
              gap: "28px",
            }}
          >
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
                  transform: hoverIndex === index ? "scale(1.04)" : "scale(1)",
                  transition: "0.25s ease",
                  cursor: "pointer",
                }}
              >
                <img
                  src={sted.Bilde}
                  alt={sted.navn}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    boxShadow: "0 0 20px rgba(255,0,184,0.25)",
                  }}
                />

                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    marginTop: "15px",
                    marginBottom: "8px",
                  }}
                >
                  {sted.navn}
                </h3>

                <p
                  style={{
                    color: "#c9c4ff",
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "12px",
                  }}
                >
                  {sted.Vibe?.join(" • ")} • {sted.Musikk?.join(" • ")}
                </p>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: "rgba(255,255,255,0.92)",
                    margin: 0,
                  }}
                >
                  {sted.Beskrivelse}
                </p>
              </div>
            ))}
          </div>

          {valgtBy !== "" && filtrerteSteder.length === 0 && (
            <p
              style={{
                fontSize: "20px",
                marginTop: "30px",
                color: "#c9c4ff",
              }}
            >
              Ingen utesteder passer med valgene dine.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const overskriftStyle = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#b8a7ff",
  textShadow: "0 0 10px #6c63ff",
  marginTop: "35px",
  marginBottom: "18px",
};

const labelStyle = {
  display: "block",
  fontSize: "16px",
  marginBottom: "10px",
  cursor: "pointer",
};