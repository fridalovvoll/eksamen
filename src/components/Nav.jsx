import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Nav() {
  const [bruker, setBruker] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setBruker(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function loggUt() {
    await signOut(auth);
    setMenuOpen(false);
  }

  function lukkMeny() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav style={navStyle}>
        {/* Venstre meny på PC */}
        <div className="nav-left" style={leftStyle}>
          <Link to="/" style={linkStyle} className="nav-link">Hjem</Link>
          <Link to="/Utesteder" style={linkStyle} className="nav-link">Utesteder</Link>
          <Link to="/hvorerfu" style={linkStyle} className="nav-link">Hvor er fu?</Link>
        </div>

        {/* Høyre meny på PC */}
        <div className="nav-right" style={rightStyle}>
          {bruker ? (
            <>
              <span style={emailStyle}>{bruker.email}</span>
              <button onClick={loggUt} style={logoutButtonStyle}>
                Logg ut
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle} className="nav-link">Login</Link>
              <Link
                to="/signup"
                style={{ ...linkStyle, background: "rgba(0,225,255,0.08)" }}
                className="nav-link"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger på mobil */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={hamburgerStyle}
          aria-label="Åpne meny"
        >
          <span style={burgerLine(menuOpen, 0)} />
          <span style={burgerLine(menuOpen, 1)} />
          <span style={burgerLine(menuOpen, 2)} />
        </button>
      </nav>

      {/* Mobilmeny */}
      {menuOpen && (
        <div style={mobileMenuStyle}>
          <Link to="/" style={mobileLinkStyle} onClick={lukkMeny}>Hjem</Link>
          <Link to="/Utesteder" style={mobileLinkStyle} onClick={lukkMeny}>Utesteder</Link>
          <Link to="/hvorerfu" style={mobileLinkStyle} onClick={lukkMeny}>Hvor er fu?</Link>

          <div style={mobileDividerStyle} />

          {bruker ? (
            <>
              <span style={mobileEmailStyle}>{bruker.email}</span>
              <button onClick={loggUt} style={mobileLogoutStyle}>
                Logg ut
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={mobileLinkStyle} onClick={lukkMeny}>Login</Link>
              <Link to="/signup" style={mobileLinkStyle} onClick={lukkMeny}>Sign up</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        .nav-link:hover {
          color: #00e1ff !important;
          text-shadow: 0 0 12px #00e1ff, 0 0 30px #00e1ff !important;
          box-shadow: 0 0 25px rgba(0,225,255,0.25) !important;
        }

        .nav-left {
          display: flex;
        }

        .nav-right {
          display: flex;
        }

        .nav-hamburger {
          display: none !important;
        }

        @media (max-width: 700px) {
          .nav-left {
            display: none !important;
          }

          .nav-right {
            display: none !important;
          }

          .nav-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

const navStyle = {
  height: "70px",
  background:
    "radial-gradient(circle at 25% 35%, rgba(0,225,255,0.16), transparent 35%), radial-gradient(circle at 75% 75%, rgba(0,170,255,0.12), transparent 35%), rgba(3,5,18,0.92)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 24px",
  backdropFilter: "blur(8px)",
  boxShadow: "0 0 25px rgba(0,225,255,0.18)",
  position: "relative",
  zIndex: 100,
};

const leftStyle = {
  gap: "8px",
  alignItems: "center",
};

const rightStyle = {
  alignItems: "center",
  gap: "12px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "600",
  padding: "8px 12px",
  borderRadius: "14px",
  transition: "0.25s ease",
  textShadow: "0 0 8px rgba(0,225,255,0.15)",
  whiteSpace: "nowrap",
};

const emailStyle = {
  color: "#c9f7ff",
  fontSize: "14px",
  fontWeight: "600",
  textShadow: "0 0 10px rgba(0,225,255,0.45)",
  maxWidth: "160px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const logoutButtonStyle = {
  background: "#00e1ff",
  border: "none",
  color: "#030512",
  padding: "8px 16px",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  boxShadow: "0 0 18px rgba(0,225,255,0.45)",
};

const hamburgerStyle = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "8px",
};

function burgerLine(open, index) {
  const base = {
    display: "block",
    width: "24px",
    height: "2px",
    background: "white",
    borderRadius: "2px",
    transition: "0.25s ease",
  };

  if (open && index === 1) {
    return { ...base, opacity: 0 };
  }

  if (open && index === 0) {
    return { ...base, transform: "translateY(7px) rotate(45deg)" };
  }

  if (open && index === 2) {
    return { ...base, transform: "translateY(-7px) rotate(-45deg)" };
  }

  return base;
}

const mobileMenuStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  background: "rgba(3,5,18,0.97)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  padding: "16px 24px 20px",
  backdropFilter: "blur(12px)",
  position: "relative",
  zIndex: 99,
};

const mobileLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "20px",
  fontWeight: "600",
  padding: "10px 0",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const mobileDividerStyle = {
  borderTop: "1px solid rgba(255,255,255,0.1)",
  margin: "8px 0",
};

const mobileEmailStyle = {
  color: "#c9f7ff",
  fontSize: "14px",
  padding: "8px 0",
};

const mobileLogoutStyle = {
  background: "#00e1ff",
  border: "none",
  color: "#030512",
  padding: "12px",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  marginTop: "4px",
};