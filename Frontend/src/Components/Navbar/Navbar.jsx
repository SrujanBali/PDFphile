import "../../app.css";

function Navbar() {
  return (
    <>
      <div className="flex h-15 bg-[#2A9D8F] mb- pb-0 justify-between">
        <div className = "flex text-4xl justify-center items-center ml-10  font-tagesschrift">
            PDFphile
        </div>
        <div className = " flex list-none gap-4 mr-10 justify-center items-center text-[20px]">
            <li>Home</li>
            <li>Contact</li>
            <li>About</li>
            <li>Add PDF</li>
        </div>
      </div>
    </>
  );
}

export default Navbar;
