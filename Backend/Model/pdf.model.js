import mongoose from "mongoose"

const pdfSchema = mongoose.Schema({
    uploadedby: String,
    username: String,
    filePath: String,
    fileName: String,
},
{
    timestamps: true
});

const File = mongoose.model("File", pdfSchema);
export default File