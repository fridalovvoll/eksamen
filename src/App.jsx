import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Hjem from "./pages/Hjem";
import Utesteder from "./pages/Utesteder";
import Hvorerfu from './pages/Hvorerfu';
import Nav from './components/Nav';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav/>

    
<Routes>
      <Route path="/" element={<Hjem />} />
      <Route path="/utesteder" element={<Utesteder />} />
      <Route path="/hvorerfu" element={<Hvorerfu/>} />
    </Routes>

        </>
  )
}

export default App
