import "../../app.css";

function Navbar() {
  return (
    <>
      <div className="flex h-15 bg-[#2A9D8F] mb- pb-0 justify-between">
        <div className="flex text-4xl justify-center items-center ml-10  font-tagesschrift">
          PDFphile
        </div>
        <div className=" flex list-none gap-4 mr-10 justify-center items-center text-[20px]">
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
    </>
  );
}

export default Navbar;
