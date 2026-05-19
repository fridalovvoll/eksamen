import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Firebase auth
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Nav() {

  // Lagrer bruker som er logget inn
  const [bruker, setBruker] = useState(null);

  // Kjører når komponenten lastes inn
  useEffect(() => {

    // Sjekker om bruker er logget inn
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setBruker(currentUser);
    });

    // Rydder opp listener når komponent fjernes
    return () => unsubscribe();

  }, []);

  // Logger ut bruker
  async function loggUt() {
    await signOut(auth);
  }

  return (

    // Hele navbaren
    <nav
      style={{
        height: "90px",

        // Bakgrunn med blå glow
        background:
          "radial-gradient(circle at 25% 35%, rgba(0,225,255,0.16), transparent 35%), radial-gradient(circle at 75% 75%, rgba(0,170,255,0.12), transparent 35%), rgba(3,5,18,0.92)",

        borderBottom: "1px solid rgba(255,255,255,0.08)",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        padding: "0 40px",

        backdropFilter: "blur(8px)",

        // Glow rundt navbar
        boxShadow: "0 0 25px rgba(0,225,255,0.18)",
      }}
    >

      {/* VENSTRE SIDE */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >

        {/* HJEM */}
        <Link to="/" style={linkStyle}>
          Hjem
        </Link>

        {/* UTESTEDER */}
        <Link to="/Utesteder" style={linkStyle}>
          Utesteder
        </Link>

        {/* HVOR ER FU */}
        <Link to="/hvorerfu" style={linkStyle}>
          Hvor er fu?
        </Link>

        

      </div>

      {/* HØYRE SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >

        {/* Hvis bruker er logget inn */}
        {bruker ? (
          <>

            {/* Viser email */}
            <span
              style={{
                color: "#c9f7ff",
                fontSize: "18px",
                fontWeight: "600",

                // Glow på teksten
                textShadow: "0 0 10px rgba(0,225,255,0.45)",
              }}
            >
              {bruker.email}
            </span>

            {/* Logg ut knapp */}
            <button
              onClick={loggUt}
              style={logoutButtonStyle}
            >
              Logg ut
            </button>

          </>
        ) : (

          <>
            {/* Login */}
            <Link to="/login" style={linkStyle}>
              Login
            </Link>

            {/* Signup */}
            <Link
              to="/signup"
              style={{
                ...linkStyle,

                // Litt blå bakgrunn
                background: "rgba(0,225,255,0.08)",
              }}
            >
              Sign up
            </Link>
          </>

        )}
      </div>
    </nav>
  );
}

/* ---------------- LINK STYLE ---------------- */

const linkStyle = {

  color: "white",
  textDecoration: "none",

  fontSize: "22px",
  fontWeight: "600",

  padding: "10px 18px",
  borderRadius: "14px",

  // Smooth overgang
  transition: "0.25s ease",

  // Litt glow som standard
  textShadow: "0 0 8px rgba(0,225,255,0.15)",
};

/* ---------------- LOGOUT BUTTON ---------------- */

const logoutButtonStyle = {

  background: "#00e1ff",
  border: "none",

  color: "#030512",

  padding: "10px 18px",

  borderRadius: "14px",

  cursor: "pointer",

  fontWeight: "bold",
  fontSize: "15px",

  // Glow
  boxShadow: "0 0 18px rgba(0,225,255,0.45)",

  transition: "0.25s ease",
};

/* ---------------- HOVER EFFEKT ---------------- */

// Når musa er over link
document.addEventListener("mouseover", (e) => {

  if (e.target.tagName === "A") {

    // Gjør teksten blå
    e.target.style.color = "#00e1ff";

    // Glow effekt
    e.target.style.textShadow =
      "0 0 12px #00e1ff, 0 0 30px #00e1ff";

    // Ekstra glow rundt
    e.target.style.boxShadow =
      "0 0 25px rgba(0,225,255,0.25)";
  }
});

// Når musa går bort
document.addEventListener("mouseout", (e) => {

  if (e.target.tagName === "A") {

    // Tilbake til hvit
    e.target.style.color = "white";

    // Vanlig glow
    e.target.style.textShadow =
      "0 0 8px rgba(0,225,255,0.15)";

    // Fjerner box shadow
    e.target.style.boxShadow = "none";
  }
});