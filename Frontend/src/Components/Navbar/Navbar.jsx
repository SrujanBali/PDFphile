import "../../app.css";

function Navbar() {
  return (
    <>
    <div className="flex flex-row z-20 fixed">
      <div className="flex flex-col h-screen bg-[#2A9D8F] mb-0 pb-0 justify-evenly w-fit">
        <div className="flex flex-col text-4xl justify-center items-center font-tagesschrift pr-7 pl-7">
          PDFphile
        </div>
        <div className=" flex flex-col list-none mr-10 justify-evenly items-center text-[20px] h-full">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/viewpdf">View PDF</a>
          </li>
        </div>
      </div>
    </div>
    </>
  );
}

export default Navbar;
