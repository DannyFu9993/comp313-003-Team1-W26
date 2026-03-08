import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import FeaturedStays from "./components/FeaturedStays"
import BenefitsSection from "./components/BenefitsSection"
import CTASection from "./components/CTASection"
import Footer from "./components/Footer"

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedStays />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App