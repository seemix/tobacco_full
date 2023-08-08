const multer = require('multer');

const status = require('../enums/status.enum');
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
        cb(null, true);
    } else {
        cb(new ApiError('Invalid file type. Only JPEG PNG and Webp files are allowed.', status.BAD_REQUEST), false);
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
            return next(err);
        } else {
            if (!req.file) return next();
            req.fileName = req.file.filename;
        }
        next();
    })
};
module.exports = saveImage;