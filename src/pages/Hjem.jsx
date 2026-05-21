import React from 'react'

export default function Hjem() {
  return (
    <div className="hero">
      <div className="hero-content">

        {/* Lilla tekst */}
        <h1
          style={{
            fontSize: "120px",
            fontWeight: "800",

            // Lilla farge
            color: "#7f73ff",

            // Glow
            textShadow:
              "0 0 18px rgba(127,115,255,0.95), 0 0 45px rgba(127,115,255,0.7)",

            marginBottom: "0px",
          }}
        >
          Finn ditt neste
        </h1>

        {/* Rosa tekst */}
        <h2
          style={{
            fontSize: "120px",
            fontWeight: "800",

            // Rosa farge
            color: "#ff00b8",

            // Glow
            textShadow:
              "0 0 18px rgba(255,0,184,0.95), 0 0 45px rgba(255,0,184,0.7)",

            marginTop: "-20px",
            marginBottom: "40px",
          }}
        >
          utested
        </h2>

        {/* Rosa undertittel */}
        <p
          style={{
            fontSize: "34px",

            // Samme rosa
            color: "#ff66d9",

            fontWeight: "600",

            textShadow:
              "0 0 12px rgba(255,0,184,0.45)",
          }}
        >
          Velg stemmningen. Finn stedet.
        </p>

  {/* OM OSS */}
  
 <section className="info-section">

  <div className="about-box">
    <h2>Om oss</h2>

    <p>
      Vi hjelper deg med å finne det perfekte utestedet!
      Enten du er ute etter en rolig bar, en livlig nattklubb
      eller det beste stedet å tilbringe kvelden med venner.
    </p>
  </div>

  <div className="contact-box">
    <h2>Kontakt oss</h2>

    <p>Gmail: Finndittutested@gmail.no</p>
  </div>

</section>
      </div>
    </div>
  );
}
