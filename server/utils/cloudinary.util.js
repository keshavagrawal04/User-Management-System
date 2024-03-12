const cloudinary = require("cloudinary").v2;

// CONFIGURATION : Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

// FUNCTION : Upload Local Files On Cloudinary Server
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// FUNCTION : Files Deletion On Cloudinary Server
const deleteOnCloudinary = async (url) => {
  try {
    if (!url) return null;
    const publicId = getPublicId(url);
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    throw error;
  }
};

// FUNCTION : Get publicId From Url
const getPublicId = (url) => {
  let parts = url.split("/");
  let fileName = parts.pop();
  let publicId = fileName.split(".")[0];
  return publicId;
};

module.exports = { uploadOnCloudinary, deleteOnCloudinary };
