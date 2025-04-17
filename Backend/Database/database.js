import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connectdb = async () =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${con.connection.host}`)
    } catch (error) {
        console.error("Error", error);
        process.exit(1)
    }
}