import React, { useState } from "react";

export default function Utesteder() {
  // Lagrer hvilket filter brukeren har valgt
  const [valgtBy, setValgtBy] = useState("");
  const [valgtVibe, setValgtVibe] = useState("");
  const [valgtMusikk, setValgtMusikk] = useState("");

  // Brukes for hover-effekt på cards
  const [hoverIndex, setHoverIndex] = useState(null);

  // Alle utestedene på siden
  const steder = [
    // TROMSØ
    {
      navn: "Heidis",
      by: "Tromsø",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse:
        "Heidis er et sosialt utested med høy allsangfaktor, popmusikk og full feststemning.",
      bilde: "/bilder/heidis.jpg",
    },
    {
      navn: "Kaia",
      by: "Tromsø",
      vibe: ["Rolig", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse:
        "Kaia passer godt for en sosial kveld med venner i et avslappet miljø.",
      bilde: "/bilder/kaia.jpg",
    },
    {
      navn: "Solid",
      by: "Tromsø",
      vibe: ["Sosialt", "Rolig"],
      musikk: ["Pop"],
      beskrivelse:
        "Solid er et sosialt utested hvor man kan spille kort, kjøpe drinker og henge med venner.",
      bilde: "/bilder/solid.jpg",
    },
    {
      navn: "No Stress",
      by: "Tromsø",
      vibe: ["Rolig", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse:
        "No Stress er et rolig og sosialt utested med avslappet stemning og popmusikk i bakgrunnen.",
      bilde: "/bilder/no stress.jpg",
    },
    {
      navn: "Skins",
      by: "Tromsø",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Hip Hop/RnB", "Pop"],
      beskrivelse:
        "Skins passer for en kveld med dans, drinker og sosial stemning.",
      bilde: "/bilder/skins.jpeg",
    },
    {
      navn: "Verdensteateret",
      by: "Tromsø",
      vibe: ["Rolig", "Sosialt"],
      musikk: ["Live"],
      beskrivelse:
        "Verdensteateret passer for en roligere kveld med kultur, samtaler og god stemning.",
      bilde: "/bilder/verdensteateret.jpg",
    },

    // OSLO
    {
      navn: "Blå",
      by: "Oslo",
      vibe: ["Sosialt"],
      musikk: ["Live", "Techno"],
      beskrivelse:
        "Blå er et sosialt utested med live musikk, DJ-er og elektroniske klubbkvelder.",
      bilde: "/bilder/bla.jpg",
    },
    {
      navn: "Jaeger",
      by: "Oslo",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Techno"],
      beskrivelse:
        "Jaeger passer for techno, dansing og lange kvelder med høy energi.",
      bilde: "/bilder/jaeger.jpg",
    },
    {
      navn: "The Villa",
      by: "Oslo",
      vibe: ["Fylla"],
      musikk: ["Techno"],
      beskrivelse:
        "The Villa er et klubbpreget utested med fokus på techno og elektronisk musikk.",
      bilde: "/bilder/the villa.jpg",
    },
    {
      navn: "Nox",
      by: "Oslo",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Hip Hop/RnB"],
      beskrivelse:
        "Nox er et sosialt og festpreget utested med hip hop og RnB.",
      bilde: "/bilder/nox.jpg",
    },
    {
      navn: "Kulturhuset",
      by: "Oslo",
      vibe: ["Rolig", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse:
        "Kulturhuset passer for en sosial kveld med venner, drinker og avslappet stemning.",
      bilde: "/bilder/kulturhuset.jpg",
    },
    {
      navn: "Ingensteds",
      by: "Oslo",
      vibe: ["Sosialt"],
      musikk: ["Live", "Techno"],
      beskrivelse:
        "Ingensteds kombinerer konserter, DJ-er og sosial stemning.",
      bilde: "/bilder/ingensteds.webp",
    },

    // BERGEN
    {
      navn: "Lille",
      by: "Bergen",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse:
        "Lille er et sosialt og festpreget utested med popmusikk, allsang og høy stemning.",
      bilde: "/bilder/lille.png",
    },
    {
      navn: "Kvarteret",
      by: "Bergen",
      vibe: ["Sosialt"],
      musikk: ["Live"],
      beskrivelse:
        "Kvarteret har konserter, arrangementer og sosial studentstemning.",
      bilde: "/bilder/kvarteret.jpeg",
    },
    {
      navn: "Østre",
      by: "Bergen",
      vibe: ["Fylla"],
      musikk: ["Techno"],
      beskrivelse:
        "Østre passer for techno, elektronisk musikk og klubbkvelder.",
      bilde: "/bilder/ostre.jpeg",
    },
    {
      navn: "Fincken",
      by: "Bergen",
      vibe: ["Sosialt"],
      musikk: ["Pop", "Hip Hop/RnB"],
      beskrivelse:
        "Fincken byr på dansing, sosial stemning og variert musikk.",
      bilde: "/bilder/fincken.jpg",
    },
    {
      navn: "Apollon",
      by: "Bergen",
      vibe: ["Rolig"],
      musikk: ["Live"],
      beskrivelse:
        "Apollon er et roligere utested med live musikk og avslappet atmosfære.",
      bilde: "/bilder/apollo.jpg",
    },
    {
      navn: "Heidis Bergen",
      by: "Bergen",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse:
        "Heidis Bergen passer for allsang, dansing og fest med venner.",
      bilde: "/bilder/heidis bergen.jpeg",
    },

    // TRONDHEIM
    {
      navn: "Lokal Bar",
      by: "Trondheim",
      vibe: ["Rolig", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse:
        "Lokal Bar er et rolig og sosialt utested med popmusikk og avslappet stemning.",
      bilde: "/bilder/lokal bar.jpeg",
    },
    {
      navn: "Diskoteket",
      by: "Trondheim",
      vibe: ["Fylla"],
      musikk: ["Techno"],
      beskrivelse:
        "Diskoteket er et festpreget utested med techno, dansing og høy energi.",
      bilde: "/bilder/diskoteket.jpeg",
    },
    {
      navn: "Samfundet",
      by: "Trondheim",
      vibe: ["Sosialt"],
      musikk: ["Live", "Pop"],
      beskrivelse:
        "Samfundet har konserter, arrangementer og sosial studentstemning.",
      bilde: "/bilder/samfundet.jpg",
    },
    {
      navn: "BrukBar",
      by: "Trondheim",
      vibe: ["Sosialt", "Fylla"],
      musikk: ["Hip Hop/RnB"],
      beskrivelse:
        "BrukBar passer for drinker, dansing og hip hop/RnB.",
      bilde: "/bilder/brukbar.avif",
    },
    {
      navn: "Tyven",
      by: "Trondheim",
      vibe: ["Rolig"],
      musikk: ["Live"],
      beskrivelse:
        "Tyven er et roligere utested med live musikk og intim stemning.",
      bilde: "/bilder/tyven.jpg",
    },
    {
      navn: "Heidis Trondheim",
      by: "Trondheim",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse:
        "Heidis Trondheim er et sosialt og festpreget utested med popmusikk og allsang.",
      bilde: "/bilder/heidis trondheim.jpeg",
    },
  ];

  // Filtrerer stedene etter by, vibe og musikk
  const filtrerteSteder = steder.filter((sted) => {
    const passerBy = valgtBy !== "" && sted.by === valgtBy;
    const passerVibe = valgtVibe === "" || sted.vibe.includes(valgtVibe);
    const passerMusikk = valgtMusikk === "" || sted.musikk.includes(valgtMusikk);

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
      {/* Hele innholdet */}
      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "flex-start",
        }}
      >
        {/* VENSTRE FILTERBOKS */}
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
          {/* BYER */}
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#b8a7ff",
              textShadow: "0 0 10px #6c63ff",
              marginTop: "0px",
              marginBottom: "18px",
            }}
          >
            BYER
          </h2>

          {["Tromsø", "Oslo", "Bergen", "Trondheim"].map((by) => (
            <label
              key={by}
              style={{
                display: "block",
                fontSize: "16px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="by"
                checked={valgtBy === by}
                onChange={() => setValgtBy(by)}
              />{" "}
              {by}
            </label>
          ))}

          {/* VIBE */}
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#b8a7ff",
              textShadow: "0 0 10px #6c63ff",
              marginTop: "35px",
              marginBottom: "18px",
            }}
          >
            VIBE
          </h2>

          {["Fylla", "Sosialt", "Rolig"].map((vibe) => (
            <label
              key={vibe}
              style={{
                display: "block",
                fontSize: "16px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="vibe"
                checked={valgtVibe === vibe}
                onChange={() => setValgtVibe(vibe)}
              />{" "}
              {vibe}
            </label>
          ))}

          {/* MUSIKK */}
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#b8a7ff",
              textShadow: "0 0 10px #6c63ff",
              marginTop: "35px",
              marginBottom: "18px",
            }}
          >
            MUSIKK
          </h2>

          {["Live", "Pop", "Techno", "Hip Hop/RnB"].map((musikk) => (
            <label
              key={musikk}
              style={{
                display: "block",
                fontSize: "16px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="musikk"
                checked={valgtMusikk === musikk}
                onChange={() => setValgtMusikk(musikk)}
              />{" "}
              {musikk}
            </label>
          ))}

          {/* Nullstiller alle filter */}
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

        {/* HOVEDINNHOLD */}
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

          {/* Vises før brukeren velger by */}
          {valgtBy === "" && (
            <p
  style={{
    fontSize: "24px",
    color: "#c9c4ff",

    // gjør at teksten havner midt på siden
    textAlign: "center",
    width: "100%",
    marginTop: "120px",
  }}
>
  Velg en by for å se utesteder ✨
</p>
          )}

          {/* Viser valgt by */}
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

          {/* Grid med cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 300px)",
              gap: "28px",
            }}
          >
            {filtrerteSteder.map((sted, index) => (
              <div
                key={index}
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
                  transform:
                    hoverIndex === index ? "scale(1.04)" : "scale(1)",
                  transition: "0.25s ease",
                  cursor: "pointer",
                }}
              >
                {/* Bilde */}
                <img
                  src={sted.bilde}
                  alt={sted.navn}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    boxShadow: "0 0 20px rgba(255,0,184,0.25)",
                  }}
                />

                {/* Navn */}
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

                {/* Vibe og musikk */}
                <p
                  style={{
                    color: "#c9c4ff",
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "12px",
                  }}
                >
                  {sted.vibe.join(" • ")} • {sted.musikk.join(" • ")}
                </p>

                {/* Beskrivelse */}
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: "rgba(255,255,255,0.92)",
                    margin: 0,
                  }}
                >
                  {sted.beskrivelse}
                </p>
              </div>
            ))}
          </div>

          {/* Vises hvis ingen steder matcher filtrene */}
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