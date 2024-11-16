// import multer from 'multer';
// import path from 'path';

// // Set storage engine
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Directory to save uploaded images
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// // File validation
// const fileFilter = (req, file, cb) => {
//     console.log("File Extension:", path.extname(file.originalname).toLowerCase()); // Log extension
//     console.log("MIME Type:", file.mimetype); // Log MIME type

//     const allowedFileTypes = /jpeg|jpg|png/;
//     const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedFileTypes.test(file.mimetype);

//     if (extname && mimetype) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
//     }
// };

// // Multer configuration
// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
//     fileFilter,
// });

// export default upload;

import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File validation
const fileFilter = (req, file, cb) => {
    console.log("File Extension:", path.extname(file.originalname).toLowerCase()); // Log extension
    console.log("MIME Type:", file.mimetype); // Log MIME type

    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
    }
};

// Multer configuration
const upload = multer({
    storage,
    limits: { 
        fileSize: 5 * 1024 * 1024, // 5MB max size
        files: 10, // Limit to 10 files
    },
    fileFilter,
});

export default upload;
