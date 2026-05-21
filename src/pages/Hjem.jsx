import React from "react";

export default function Hjem() {
  return (
    <div className="home-page">
      <main className="hero">
        <h1 className="logo-main">Finn ditt neste</h1>
        <h2 className="logo-script">utested</h2>
        <p className="subtext">Velg stemmningen. Finn stedet.</p>
      </main>

      <section className="info-section">
        <div className="about-box">
          <h2>Om oss</h2>
          <p>
            Vi hjelper deg med å finne det perfekte utestedet! Enten du er ute
            etter en rolig bar, en livlig nattklubb eller det beste stedet å
            tilbringe kvelden med venner.
          </p>
        </div>

        <div className="contact-box">
          <h2>Kontakt oss</h2>
          <p>Gmail: Finndittutested@gmail.no</p>
        </div>
      </section>
    </div>
  );
}