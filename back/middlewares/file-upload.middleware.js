const multer = require('multer');

const ApiError = require('../errors/api.error');
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxFileSizeInBytes = 2 * 1024 * 1024;

const storage = (folderName) => multer.diskStorage({
    destination: `./uploads/${folderName}`,
    filename: (req, file, cb) => {
        const ext = '.' + file.originalname.split('.')[1];
        const fileName = Array(32).fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16)).join('');
        return cb(null, `${fileName}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new ApiError('Invalid file type. Only JPEG PNG and Webp files are allowed.', 400), false);
    }
};
const upload = (folderName) => multer({
    storage: storage(folderName),
    fileFilter: fileFilter,
    limits: {
        fileSize: maxFileSizeInBytes
    }
}).single('image');

const saveImage = (folderName) => (req, res, next) => {
    const uploader = upload(folderName);
    uploader(req, res, function (err) {
        if (err) {
          //  return res.status(400).json( err.message );
            return next(err);
        } else {
            if (!req.file) return next();
            req.fileName = req.file.filename;
        }
        next();
    })
};
module.exports = saveImage;