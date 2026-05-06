import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar">
      <Link to="/hjem">Hjem</Link>
      <Link to="/utesteder">Utesteder</Link>
      <Link to="/hvorerfu">Hvor er FU</Link>
    </nav>
  );
}

