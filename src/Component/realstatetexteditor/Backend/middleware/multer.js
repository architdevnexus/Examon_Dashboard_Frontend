// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, './public/temp'); // folder to save images
//     },
//     filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' +file.originalname);
//     }
// });

// const svgfileFilter = (req, file, cb) => {
//     // console.log("File Upload Attempt:", file.originalname);
//     // console.log("MIME TYPE:", file.mimetype);
//     if(file.mimetype === 'image/svg+xml'){
//         cb(null, true);
//     } else {
//         cb(new Error('Only Svg files are allowed'), false);
//     }
// };

// const svgStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/temp');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });

// export const upload = multer({ storage: storage });
// export const svgUpload = multer({storage: svgStorage, fileFilter: svgfileFilter});
import multer from "multer";
import path from "path";

// Common file size limit (in bytes)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FIELD_SIZE = 25 * 1024 * 1024; // 25 MB for text fields

// General storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + "-" + file.fieldname + ext);
    },
});

// SVG-specific file filter
const svgFileFilter = (req, file, cb) => {
    if (file.mimetype === "image/svg+xml") {
        cb(null, true);
    } else {
        cb(new Error("Only SVG files are allowed"), false);
    }
};

// Storage for SVG files
const svgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + "-" + file.fieldname + ext);
    },
});

// Main uploader for normal images
export const upload = multer({
    storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
        fieldSize: MAX_FIELD_SIZE,
    },
});

// Uploader only for SVG files
export const svgUpload = multer({
    storage: svgStorage,
    fileFilter: svgFileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
        fieldSize: MAX_FIELD_SIZE,
    },
});

// Optional: Memory storage (useful for Cloudinary direct uploads without saving locally)
export const memoryUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE,
        fieldSize: MAX_FIELD_SIZE,
    },
});
