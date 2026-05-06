import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Hjem from "./pages/Hjem";
import Utesteder from "./pages/Utesteder";
import Nav from './components/Nav';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav/>

    
<Routes>
      <Route path="/" element={<Hjem />} />
      <Route path="/about" element={<Utesteder />} />
    </Routes>

        </>
  )
}

export default App
