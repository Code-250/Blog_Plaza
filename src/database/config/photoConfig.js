import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";

config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary.uploader;