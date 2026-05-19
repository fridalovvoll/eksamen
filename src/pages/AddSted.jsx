import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AddSted() {
  const [navn, setNavn] = useState("");
  const [by, setBy] = useState("");
  const [vibe, setVibe] = useState("");
  const [musikk, setMusikk] = useState("");
  const [beskrivelse, setBeskrivelse] = useState("");
  const [bilde, setBilde] = useState("");

  async function leggTilSted(e) {
    e.preventDefault();

    await addDoc(collection(db, "steder"), {
      navn: navn,
      By: by,
      Vibe: vibe.split(",").map((v) => v.trim()),
      Musikk: musikk.split(",").map((m) => m.trim()),
      Beskrivelse: beskrivelse,
      Bilde: bilde,
    });

    setNavn("");
    setBy("");
    setVibe("");
    setMusikk("");
    setBeskrivelse("");
    setBilde("");

    alert("Utested lagt til!");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030512",
        color: "white",
        padding: "60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#b8a7ff" }}>Legg til utested</h1>

      <form
        onSubmit={leggTilSted}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "450px",
        }}
      >
        <input placeholder="Navn" value={navn} onChange={(e) => setNavn(e.target.value)} />
        <input placeholder="By, f.eks Tromsø" value={by} onChange={(e) => setBy(e.target.value)} />
        <input placeholder="Vibe, f.eks Fylla, Sosialt" value={vibe} onChange={(e) => setVibe(e.target.value)} />
        <input placeholder="Musikk, f.eks Pop, Techno" value={musikk} onChange={(e) => setMusikk(e.target.value)} />
        <input placeholder="Bilde, f.eks /bilder/heidis.jpg" value={bilde} onChange={(e) => setBilde(e.target.value)} />

        <textarea
          placeholder="Beskrivelse"
          value={beskrivelse}
          onChange={(e) => setBeskrivelse(e.target.value)}
          rows="4"
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "18px",
            border: "none",
            background: "#ff00b8",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Legg til
        </button>
      </form>
    </div>
  );
}