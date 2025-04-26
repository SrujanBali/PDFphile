import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Homepage from "./Pages/Homepage.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import AddPDF from "./Pages/AddPDF.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addpdf" element={<AddPDF />} />
      </Routes>
    </>
  );
}

export default App;
