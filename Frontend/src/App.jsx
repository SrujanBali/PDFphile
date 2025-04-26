import {Route, Routes} from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar.jsx"
import Homepage from "./Pages/Homepage.jsx"

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path = "/" element = {<Homepage/>}/>
    </Routes>
    </>
  )
}

export default App