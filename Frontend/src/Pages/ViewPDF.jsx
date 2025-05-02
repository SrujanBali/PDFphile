import "../app.css";
import { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

function ViewPDF() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.8);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef();
  const contentRef = useRef();
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const scrollStart = useRef({ left: 0, top: 0 });

  const handleWheel = (e) => {
    e.preventDefault();

    const delta = -e.deltaY;
    const zoomFactor = delta > 0 ? 1.1 : 0.9;

    const container = containerRef.current;

    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.5), 3);

    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;

    const zoomRatio = newZoom / zoom;

    const newScrollLeft = (offsetX + scrollLeft) * zoomRatio - offsetX;
    const newScrollTop = (offsetY + scrollTop) * zoomRatio - offsetY;

    setZoom(newZoom);

    requestAnimationFrame(() => {
      container.scrollLeft = newScrollLeft;
      container.scrollTop = newScrollTop;
    });
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    const container = containerRef.current;
    scrollStart.current = {
      left: container.scrollLeft,
      top: container.scrollTop,
    };
    container.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const container = containerRef.current;
    container.scrollLeft = scrollStart.current.left - dx;
    container.scrollTop = scrollStart.current.top - dy;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    containerRef.current.style.cursor = "grab";
  };

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

  const zoomIn = () => {
    setZoom(1);
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setZoom(1);
    setScale((prev) => Math.max(prev - 0.2, 0.4));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        PrevPage();
      } else if (event.key === "ArrowRight") {
        NextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [numPages]);

  return (
    <>
      <div className="flex flex-col justify-center min-h-screen h-fit items-center bg-[#1d323b] gap-8 pb-10">
        {!file && (
          <>
            <h1 className="text-5xl text-white">Add your PDF to View</h1>
            <label
              htmlFor="file-input"
              className="bg-amber-500 cursor-pointer text-center p-2 hover:border-l-4 hover:border-b-4"
            >
              Choose Your File
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
            <div className="flex justify-center items-center gap-20 mt-7">
              <button
                className="flex justify-center bg-[#e9c46a] rounded-[10px] p-2 mb-5 w-fit"
                onClick={zoomIn}
              >
                +
              </button>
              <p className="bg-[#e9c46a] rounded-[10px] p-2 mb-5 w-fit">
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
                className="flex justify-center bg-[#e9c46a] rounded-[10px] p-2 mb-5 w-fit"
                onClick={zoomOut}
              >
                -
              </button>
            </div>
            <div
              className="flex flex-row justify-center items-center overflow-auto"
              onMouseEnter={() => (document.body.style.overflow = "hidden")}
              onMouseLeave={() => (document.body.style.overflow = "auto")}
            >
              <button
                onClick={PrevPage}
                className="flex bg-gradient-to-l from-[#e9c46a] to-[#1d323b]  p-2 h-130 text-4xl mr-4 items-center"
              >
                {"<"}
              </button>
              <div
                className="flex w-[500px] h-[633px] justify-center overflow-auto relative items-center"
                ref={containerRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                on
              >
                <div
                  ref={contentRef}
                  className="flex justify-center transition-transform"
                  style={{
                    minWidth: `${500 * scale * zoom}px`,
                    minHeight: `${633 * scale * zoom}px`,
                  }}
                >
                  <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={pageNumber}
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Page
                          pageNumber={pageNumber}
                          scale={scale * zoom}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </Document>
                </div>
              </div>
              <button
                onClick={NextPage}
                className="flex bg-gradient-to-l to-[#e9c46a] from-[#1d323b]  p-2 h-130 text-4xl ml-4 items-center"
              >
                {">"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewPDF;
