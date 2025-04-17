import File from "../Model/pdf.model.js";

export const fileUpload = async (req, res) => {
  try {
    const {uploadedby, username} = req.body;
    const pdfFile = req.file;

    if(!pdfFile){
        return res.status(400).json({success: false, message: "No PDF file uploaded"})
    };

    const newfile = new File({
        uploadedby, 
        username, 
        fileName: pdfFile.originalname,
        filePath: pdfFile.path,
    })

    await newfile.save();
    res.status(200).json({ success: true, message: "File uploaded successfully", data: newfile });
  } catch (error) {
    console.error("Error in uploading File", error.message);
    res.staus(500).json({ success: false, message: "Internal Server Error" });
  }
};
