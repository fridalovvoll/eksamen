import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Hjem from "./pages/Hjem";
import Hvorerfu from './pages/Hvorerfu';
import Utesteder from './pages/Utesteder';
import Nav from './components/Nav';
import AddSted from './pages/AddSted';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav/>

    
<Routes>
      <Route path="/" element={<Hjem />} />
      <Route path="/utesteder" element={<Utesteder/>} />
      <Route path="/hvorerfu" element={<Hvorerfu/>} />
            <Route path="/addsted" element={<AddSted />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />



    </Routes>

        </>
  )
}

export default App
