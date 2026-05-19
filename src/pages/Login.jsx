import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passord, setPassord] = useState("");
  const [feil, setFeil] = useState("");
  const navigate = useNavigate();

  async function loggInn(e) {
    e.preventDefault();
    setFeil("");

    try {
      await signInWithEmailAndPassword(auth, email, passord);
      navigate("/utesteder2");
    } catch (error) {
      setFeil("Feil e-post eller passord.");
    }
  }

  return (
    <div style={sideStyle}>
      <form onSubmit={loggInn} style={formStyle}>
        <h1>Logg inn</h1>

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

        {feil && <p style={{ color: "#ff6b6b" }}>{feil}</p>}

        <button type="submit" style={buttonStyle}>
          Logg inn
        </button>

        <p>
          Har du ikke bruker? <Link to="/signup">Registrer deg</Link>
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
};

const formStyle = {
  width: "350px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.06)",
  boxShadow: "0 0 25px rgba(0,225,255,0.25)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "18px",
  border: "none",
  background: "#00e1ff",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
};