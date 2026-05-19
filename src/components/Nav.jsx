import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Nav() {
  const [bruker, setBruker] = useState(null);

  // Sjekker om bruker er logget inn
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setBruker(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logger ut bruker
  async function loggUt() {
    await signOut(auth);
  }

  return (
    <nav
      style={{
        height: "90px",
        background:
          "radial-gradient(circle at 25% 35%, rgba(255,0,184,0.18), transparent 35%), radial-gradient(circle at 75% 75%, rgba(0,170,255,0.12), transparent 35%), rgba(3,5,18,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        backdropFilter: "blur(8px)",
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
        <Link to="/" style={linkStyle}>
          Hjem
        </Link>

        <Link to="/utesteder" style={linkStyle}>
          Utesteder
        </Link>

        <Link to="/hvorerfu" style={linkStyle}>
          Hvor er fu?
        </Link>

        <Link to="/utesteder2" style={linkStyle}>
          Utesteder 2
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
        {bruker ? (
          <>
            {/* Viser navn/email */}
            <span
              style={{
                color: "#c9c4ff",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {bruker.email}
            </span>

            {/* Logout */}
            <button
              onClick={loggUt}
              style={{
                background: "#ff00b8",
                border: "none",
                color: "white",
                padding: "10px 18px",
                borderRadius: "14px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Logg ut
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>

            <Link
              to="/signup"
              style={{
                ...linkStyle,
                background: "rgba(255,255,255,0.08)",
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

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "22px",
  fontWeight: "600",
  transition: "0.3s ease",
  padding: "10px 18px",
  borderRadius: "14px",
};