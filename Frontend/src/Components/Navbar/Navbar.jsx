import "../../app.css";
import ActivePage from "../ActivePage"

function Navbar() {
  return (
    <>
    <div className="flex flex-row z-20 fixed">
      <div className="flex flex-col h-screen bg-[#2A9D8F] mb-0 pb-0 justify-evenly w-fit">
        <div className="flex flex-col text-4xl justify-center items-center font-tagesschrift pr-7 pl-7">
          <a href="/">PDFphile</a>
        </div>
        <div className=" flex flex-col list-none pl-5 justify-evenly items-center text-[23px] h-full w-full font-josefin">
            <ActivePage to = "/about">About</ActivePage>
            <ActivePage to = "/contact">Contact</ActivePage>
            <ActivePage to = "/viewpdf">View PDF</ActivePage>
            <ActivePage to = "/editpdf">Edit PDF</ActivePage>
        </div>
      </div>
    </div>
    </>
  );
}

export default Navbar;
