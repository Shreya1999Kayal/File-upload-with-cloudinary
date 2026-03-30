const multer = require('multer');

// Allowed image types
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/bmp': 'bmp'
};

// Memory storage
const storage = multer.memoryStorage();

// File filter to validate image types
const fileFilter = (req, file, cb) => {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    if (isValid) {
        cb(null, true); // accept file
    } else {
        cb(new Error('Invalid image type'), false); // reject file
    }
};

// Multer instance
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;