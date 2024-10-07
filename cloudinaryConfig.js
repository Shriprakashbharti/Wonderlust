const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDANRY_NAME,
    api_key:process.env.CLOUDANRY_API_KEY,
    api_secret:process.env.CLOUDANRY_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wonderlust-image',
      allowed_formats: ['png', 'jpg', 'jpeg'],
    },
  });

  module.exports={
    cloudinary,
    storage
  };