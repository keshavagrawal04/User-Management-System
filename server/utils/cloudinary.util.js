const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// CONFIGURATION : Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET
});

// FUNCTION : Upload Local Files On Cloudinary Server
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        // fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        // fs.unlinkSync(localFilePath);
        return null;
    }
}

module.exports = uploadOnCloudinary;
