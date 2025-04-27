import "../app.css";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function AddPDF() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setPageNumber(1);
    } else alert("Please select a valid PDF file");
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const PrevPage = () => {
    setPageNumber((prevPage) => (prevPage <= 1 ? 1 : prevPage - 1));
  };

  const NextPage = () => {
    setPageNumber((prevPage) =>
      prevPage >= numPages ? numPages : prevPage + 1
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center min-h-screen h-fit items-center bg-[#264653] gap-8">
        {!file && (
          <>
            <h1 className="text-5xl text-white">Add your PDF to View</h1>
            <label
              htmlFor="file-input"
              className="bg-amber-500 cursor-pointer text-center p-2 hover:border-l-4 hover:border-b-4"
            >
              Choose Your File Buddy
            </label>
            <input
              id="file-input"
              type="file"
              className="hidden "
              onChange={onFileChange}
              accept="application/pdf"
            />
          </>
        )}
        {file && (
          <div>
            <nav className="flex flex-row gap-5 justify-center">
              <button
                onClick={PrevPage}
                className="bg-[#e9c46a] rounded-[10px] p-2 mb-5"
              >
                Prev Page
              </button>
              <p className="bg-[#e9c46a] rounded-[10px] p-2 mb-5">
                Page &nbsp;
                <input
                  type="number"
                  name="PageNumber"
                  value={pageNumber}
                  contentEditable="true"
                  onChange={(e) =>
                    setPageNumber(
                      Math.max(1, Math.min(numPages, Number(e.target.value)))
                    )
                  }
                  className="w-6 text-center border-2 rounded-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  "
                />
                &nbsp; of {numPages}
              </p>
              <button
                onClick={NextPage}
                className="bg-[#e9c46a] rounded-[10px] p-2 mb-5"
              >
                Next Page
              </button>
            </nav>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} scale={0.7} />
            </Document>
          </div>
        )}
      </div>
    </>
  );
}

export default AddPDF;
