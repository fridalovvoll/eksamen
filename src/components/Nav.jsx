import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

export default function Nav() {
  return (

    // Hele navbaren
    <nav
      style={{
        height: "90px",

        background:
          "radial-gradient(circle at 25% 35%, rgba(255,0,184,0.18), transparent 35%), radial-gradient(circle at 75% 75%, rgba(0,170,255,0.12), transparent 35%), rgba(3,5,18,0.92)",

        borderBottom: "1px solid rgba(255,255,255,0.08)",

        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",

        backdropFilter: "blur(8px)",
      }}
    >

      {/* HJEM */}
      <Link
        to="/"
        style={linkStyle}
      >
        Hjem
      </Link>

      {/* UTESTEDER */}
      <Link
        to="/utesteder"
        style={linkStyle}
      >
        Utesteder
      </Link>

      {/* HVOR ER fu? */}
      <Link
        to="/hvorerfu"
        style={linkStyle}
      >
        Hvor er fu?
      </Link>

    </nav>
  );
}

// Styling som brukes på alle linkene
const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "28px",
  fontWeight: "600",

  // Gjør animasjonen smooth
  transition: "0.3s ease",

  // Når musa er over
  padding: "10px 18px",
  borderRadius: "14px",
};

// Hover-effekt med css
document.addEventListener("mouseover", (e) => {
  if (e.target.tagName === "A") {
    e.target.style.color = "#00e1ff";
    e.target.style.textShadow = "0 0 12px #00e1ff, 0 0 30px #00e1ff";
  }
});

// Når musa går bort
document.addEventListener("mouseout", (e) => {
  if (e.target.tagName === "A") {
    e.target.style.color = "white";
    e.target.style.textShadow = "none";
  }
});

