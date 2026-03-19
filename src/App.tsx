import { useState } from "react";
import NavBar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Pricing from "./components/Pricing.tsx";
import Contact from "./components/Contact.tsx";

function App() {
  const [selectedPackage, setSelectedPackage] = useState("");

  return (
    <>
      <NavBar />
      <main>
        <Hero id="hero" />
        <About id="about" />
        <Pricing id="pricing" onSelectPackage={setSelectedPackage} />
        <Contact id="contact" selectedPackage={selectedPackage} />
      </main>
      <Footer />
    </>
  );
}

export default App;
