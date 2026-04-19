import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedStays from "./components/FeaturedStays";
import RecommendationSection from "./components/RecommendationSection";
import BenefitsSection from "./components/BenefitsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import StayDetail from "./pages/StayDetail";
import AllStays from "./pages/AllStays";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedStays />
      <RecommendationSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </>
  );
}

import EmployeeLogin from "./pages/EmployeeLogin";

import EmployeeHome from "./pages/EmployeeHome";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/accommodations/:id" element={<StayDetail />} />
        <Route path="/stays" element={<AllStays />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee", "admin"]}>
              <EmployeeHome />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/employee-home"
          element={
            <ProtectedRoute>
              <EmployeeHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
