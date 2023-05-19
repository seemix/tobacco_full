const multer = require('multer');
//const path = require('path');
//const fs = require('fs');

const storage = (folderName) => multer.diskStorage({
    destination: `./uploads/${folderName}`,
    filename: (req, file, cb) => {
        const ext = '.'+file.originalname.split('.')[1];
        const fileName = Array(32).fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16)).join('');
        return cb(null, `${fileName}${ext}`);
    }
});
const upload = (folderName) => multer({
    storage: storage(folderName)
}).single('image');

const saveImage = (folderName) => (req, res, next) => {
    const uploader = upload(folderName);
    uploader(req, res, function (err) {
        if (err) {
           // next(err);
            return res.status(500).send({ error: err.message });
        } else {
            if(!req.file) return next();
            req.fileName = req.file.filename;
        }
        next();
    })
};
module.exports = saveImage;