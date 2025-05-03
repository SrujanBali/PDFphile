import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Homepage from "./Pages/Homepage.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import ViewPDF from "./Pages/ViewPDF.jsx";

function App() {
  return (
    <>
      <div className="flex min-h-screen">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/viewpdf" element={<ViewPDF />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
