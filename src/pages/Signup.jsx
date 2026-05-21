import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [passord, setPassord] = useState("");
  const [feil, setFeil] = useState("");
  const navigate = useNavigate();

  async function registrerBruker(e) {
    e.preventDefault();
    setFeil("");
    try {
      await createUserWithEmailAndPassword(auth, email, passord);
      navigate("/utesteder2");
    } catch (error) {
      setFeil("Kunne ikke lage bruker. Sjekk e-post og passord.");
    }
  }

  return (
    <div style={sideStyle}>
      <form onSubmit={registrerBruker} style={formStyle}>
        <h1 style={{ margin: "0 0 8px", fontSize: "28px" }}>Registrer deg</h1>

        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Passord"
          value={passord}
          onChange={(e) => setPassord(e.target.value)}
          style={inputStyle}
        />

        {feil && <p style={{ color: "#ff6b6b", margin: 0 }}>{feil}</p>}

        <button type="submit" style={buttonStyle}>Lag bruker</button>

        <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
          Har du bruker? <Link to="/login" style={{ color: "#ff00b8" }}>Logg inn</Link>
        </p>
      </form>
    </div>
  );
}

const sideStyle = {
  minHeight: "100vh",
  background: "#030512",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
  padding: "20px",
  boxSizing: "border-box",
};

const formStyle = {
  width: "100%",
  maxWidth: "380px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.06)",
  boxShadow: "0 0 25px rgba(255,0,184,0.25)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  boxSizing: "border-box",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "18px",
  border: "none",
  background: "#ff00b8",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};
