import React, { useState } from "react";

export default function Utesteder() {
  // Her lagres valgene brukeren trykker på
  const [valgtBy, setValgtBy] = useState("");
  const [valgtVibe, setValgtVibe] = useState("");
  const [valgtMusikk, setValgtMusikk] = useState("");

  // Liste med alle utestedene
  const steder = [
    // TROMSØ
    {
      navn: "Heidis Bier Bar",
      by: "Tromsø",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse: "Heidis er et sosialt utested med allsang, popmusikk og høy feststemning.",
      bilde: "/bilder/heidis.jpg",
    },
    {
      navn: "Kaia",
      by: "Tromsø",
      vibe: ["Sosialt", "Rolig"],
      musikk: ["Pop"],
      beskrivelse: "Kaia passer godt for en sosial kveld med venner i et avslappet miljø.",
      bilde: "/bilder/kaia.jpg",
    },
    {
      navn: "Solid",
      by: "Tromsø",
      vibe: ["Sosialt", "Rolig"],
      musikk: ["Pop"],
      beskrivelse: "Solid er et sosialt utested hvor man kan spille kort, kjøpe drinker og henge med venner.",
      bilde: "/bilder/solid.jpg",
    },
    {
      navn: "No Stress",
      by: "Tromsø",
      vibe: ["Rolig", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse: "No Stress har en avslappet stemning og passer godt for å henge med venner.",
      bilde: "/bilder/no stress.jpg",
    },
    {
      navn: "Skins",
      by: "Tromsø",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Hip Hop/RnB", "Pop"],
      beskrivelse: "Skins passer for en kveld med dans, drinker og sosial stemning.",
      bilde: "/bilder/skins.jpeg",
    },
    {
      navn: "Verdensteateret",
      by: "Tromsø",
      vibe: ["Rolig", "Sosialt"],
      musikk: ["Live"],
      beskrivelse: "Verdensteateret passer for en roligere kveld med kultur, samtaler og god stemning.",
      bilde: "/bilder/verdensteateret.jpg",
    },

    // OSLO
    {
      navn: "Blå",
      by: "Oslo",
      vibe: ["Sosialt"],
      musikk: ["Live", "Techno"],
      beskrivelse: "Blå er et sosialt utested med live musikk, DJ-er og elektroniske klubbkvelder. Stedet passer godt for deg som vil oppleve konserter, techno og en kreativ atmosfære.",
      bilde: "/bilder/bla.jpg",
    },
    {
      navn: "Jaeger",
      by: "Oslo",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Techno"],
      beskrivelse: "Jaeger er et livlig utested for deg som liker fylla, dansing og techno. Her er det høy energi, DJ-er og klubbfølelse gjennom kvelden.",
      bilde: "/bilder/jaeger.jpg",
    },
    {
      navn: "The Villa",
      by: "Oslo",
      vibe: ["Fylla"],
      musikk: ["Techno"],
      beskrivelse: "The Villa er et klubbpreget utested med fokus på techno og elektronisk musikk. Det passer godt for deg som vil ha en kveld med fylla, dans og mørk klubbstemning",
      bilde: "/bilder/the villa.jpg",
    },
    {
      navn: "Nox",
      by: "Oslo",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Hip Hop/RnB"],
      beskrivelse: "Nox er et sosialt og festpreget utested med hip hop og RnB. Stedet passer for deg som vil danse, kjøpe drinker og være ute med venner.",
      bilde: "/bilder/nox.jpg",
    },
    {
      navn: "Kulturhuset",
      by: "Oslo",
      vibe: ["Rolig", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse: "Kulturhuset er et rolig og sosialt utested med avslappet stemning og popmusikk. Det passer godt for å henge med venner, prate og ta noe godt å drikke.",
      bilde: "/bilder/kulturhuset.jpg",
    },
    {
      navn: "Ingensteds",
      by: "Oslo",
      vibe: ["Sosialt"],
      musikk: ["Live", "Techno"],
      beskrivelse: "Ingensteds er et sosialt utested med live musikk, DJ-er og techno. Stedet passer for deg som vil ha en kveld med musikk, dans og god stemning.",
      bilde: "/bilder/ingensteds.webp",
    },

    // BERGEN
    {
      navn: "Lille",
      by: "Bergen",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse: "Lille er et sosialt og festpreget utested med popmusikk, allsang og høy stemning. Det passer godt for fylla og en kveld ute med venner",
      bilde: "/bilder/lille.png",
    },
    {
      navn: "Kvarteret",
      by: "Bergen",
      vibe: ["Sosialt"],
      musikk: ["Live"],
      beskrivelse: "Kvarteret er et sosialt utested med live musikk, konserter og arrangementer. Stedet passer godt for deg som vil kombinere musikkopplevelser med en sosial kveld.",
      bilde: "/bilder/kvarteret.jpeg",
    },
    {
      navn: "Østre",
      by: "Bergen",
      vibe: ["Fylla"],
      musikk: ["Techno"],
      beskrivelse: "Østre er et utested for deg som liker fylla, techno og elektronisk musikk. Her er det klubbstemning, DJ-er og god energi på dansegulvet.",
      bilde: "/bilder/østre.jpeg",
    },
    {
      navn: "Fincken",
      by: "Bergen",
      vibe: ["Sosialt"],
      musikk: ["Pop", "Hip Hop/RnB"],
      beskrivelse: "Fincken er et sosialt utested med pop, hip hop og RnB. Det passer godt for dansing, drinker og en kveld med variert musikk og god stemning.",
      bilde: "/bilder/fincken.jpg",
    },
    {
      navn: "Apollon",
      by: "Bergen",
      vibe: ["Rolig"],
      musikk: ["Live"],
      beskrivelse: "Apollon er et roligere utested med live musikk og avslappet atmosfære. Det passer godt for en kveld med gode samtaler og musikk i bakgrunnen.",
      bilde: "/bilder/apollo.jpg",
    },
    {
      navn: "Heidis Bergen",
      by: "Bergen",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse: "Heidis Bergen er et festpreget og sosialt utested med popmusikk, allsang og høy energi. Det passer godt for fylla, dansing og vennegjenger.",
      bilde: "/bilder/heidis bergen.jpeg",
    },

    // TRONDHEIM
    {
      navn: "Lokal Bar",
      by: "Trondheim",
      vibe: ["Rolig", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse: "Lokal Bar er et rolig og sosialt utested med popmusikk og avslappet stemning. Det passer godt for å henge med venner i et behagelig miljø",
      bilde: "/bilder/lokal bar.jpeg",
    },
    {
      navn: "Diskoteket",
      by: "Trondheim",
      vibe: ["Fylla"],
      musikk: ["Techno"],
      beskrivelse: "Diskoteket er et festpreget utested med techno, dansing og høy energi. Det passer godt for fylla og en kveld på dansegulvet med venner.",
      bilde: "/bilder/diskoteket.jpeg",
    },
    {
      navn: "Samfundet",
      by: "Trondheim",
      vibe: ["Sosialt"],
      musikk: ["Live", "Pop"],
      beskrivelse: "Samfundet er et sosialt utested med live musikk, pop og studentstemning. Det passer godt for konserter, arrangementer og en kveld med venner.",
      bilde: "/bilder/samfundet.jpg",
    },
    {
      navn: "BrukBar",
      by: "Trondheim",
      vibe: ["Sosialt", "Fylla"],
      musikk: ["Hip Hop/RnB"],
      beskrivelse: "BrukBar er et sosialt og festpreget utested med hip hop og RnB. Her passer det å dra for drinker, dansing og god stemning.",
      bilde: "/bilder/brukbar.avif",
    },
    {
      navn: "Tyven",
      by: "Trondheim",
      vibe: ["Rolig"],
      musikk: ["Live"],
      beskrivelse: "Tyven er et roligere utested med live musikk og intim stemning. Det passer godt for en avslappet kveld med konserter og gode samtaler.",
      bilde: "/bilder/tyven.jpg",
    },
    {
      navn: "Heidis Trondheim",
      by: "Trondheim",
      vibe: ["Fylla", "Sosialt"],
      musikk: ["Pop"],
      beskrivelse: "Heidis Trondheim er et sosialt og festpreget utested med popmusikk og allsang. Det passer godt for fylla, dansing og store vennegjenger.",
      bilde: "/bilder/heidis trondheim.jpeg",
    },

    
  ];

  // Filtrerer utestedene etter valgene brukeren har tatt
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
        fontFamily: "Arial",
        padding: "60px",
      }}
    >
      <div style={{ display: "flex", gap: "60px" }}>
        {/* FILTERMENY */}
        <div style={{ width: "230px" }}>
          <h2>Byer</h2>

          {/* Knapper for by */}
          {["Tromsø", "Oslo", "Bergen", "Trondheim",].map((by) => (
            <label key={by} style={{ display: "block", fontSize: "21px", marginBottom: "15px" }}>
              <input
                type="radio"
                name="by"
                checked={valgtBy === by}
                onChange={() => setValgtBy(by)}
              />{" "}
              {by}
            </label>
          ))}

          <h2 style={{ marginTop: "45px" }}>Vibe</h2>

          {/* Knapper for vibe */}
          {["Fylla", "Sosialt", "Rolig"].map((vibe) => (
            <label key={vibe} style={{ display: "block", fontSize: "21px", marginBottom: "15px" }}>
              <input
                type="radio"
                name="vibe"
                checked={valgtVibe === vibe}
                onChange={() => setValgtVibe(vibe)}
              />{" "}
              {vibe}
            </label>
          ))}

          <h2 style={{ marginTop: "45px" }}>Musikk</h2>

          {/* Knapper for musikk */}
          {["Live", "Pop", "Techno", "Hip Hop/RnB"].map((musikk) => (
            <label key={musikk} style={{ display: "block", fontSize: "21px", marginBottom: "15px" }}>
              <input
                type="radio"
                name="musikk"
                checked={valgtMusikk === musikk}
                onChange={() => setValgtMusikk(musikk)}
              />{" "}
              {musikk}
            </label>
          ))}

          {/* Nullstiller alle valg */}
          <button
            onClick={() => {
              setValgtBy("");
              setValgtVibe("");
              setValgtMusikk("");
            }}
            style={{
              marginTop: "35px",
              padding: "12px 18px",
              borderRadius: "20px",
              border: "none",
              background: "#ff00b8",
              color: "white",
              fontWeight: "bold",
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
              fontSize: "55px",
              marginBottom: "15px",
              color: "#b8a7ff",
              textShadow: "0 0 20px #6c63ff",
            }}
          >
            Utesteder
          </h1>

          {/* Tekst før man har valgt by */}
          {valgtBy === "" && (
            <p style={{ fontSize: "24px", color: "#c9c4ff" }}>
              Velg en by for å se utesteder.
            </p>
          )}

          {/* Viser valgt by */}
          {valgtBy !== "" && (
            <h2 style={{ marginBottom: "35px" }}>Utesteder i {valgtBy}</h2>
          )}

          {/* Grid med cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "40px",
            }}
          >
            {filtrerteSteder.map((sted, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "28px",
                  padding: "18px",
                  boxShadow: "0 0 25px rgba(108,99,255,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Bilde av utested */}
                <img
                  src={sted.bilde}
                  alt={sted.navn}
                  style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "cover",
                    borderRadius: "22px",
                    boxShadow: "0 0 30px rgba(255,0,184,0.35)",
                  }}
                />

                <h3 style={{ fontSize: "28px", marginBottom: "8px" }}>
                  {sted.navn}
                </h3>

                <p style={{ color: "#c9c4ff", fontSize: "18px" }}>
                  {sted.vibe.join(" • ")} • {sted.musikk.join(" • ")}
                </p>

                <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  {sted.beskrivelse}
                </p>
              </div>
            ))}
          </div>

          {/* Vises hvis ingen steder passer filtrene */}
          {valgtBy !== "" && filtrerteSteder.length === 0 && (
            <p style={{ fontSize: "24px", marginTop: "40px" }}>
              Ingen utesteder passer med valgene dine.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}