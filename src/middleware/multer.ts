import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Set the destination folder for uploaded profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/profile_pics');

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // This will create the directory if it doesn't exist
    }

    cb(null, uploadPath); // Proceed with the upload in the created directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on timestamp and the original file name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the above storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB (optional)
  fileFilter: (req, file, cb) => {
    // Only allow image files (JPEG, PNG, GIF)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // If file is valid, proceed
    } else {
      cb(new Error('Only image files are allowed.')); // If file is invalid, return error
    }
  },
});

export { upload };


