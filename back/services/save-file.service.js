const multer = require('multer');

const storage = (folderName) => multer.diskStorage({
    destination: `./uploads/${folderName}`,
    filename: (req, file, cb) => {
        const ext = '.' + file.originalname.split('.')[1];
        const fileName = Array(32).fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16)).join('');
        return cb(null, `${fileName}${ext}`);
    }
});
// const storage = (folderName) => multer.diskStorage({
//     destination: `./uploads/${folderName}`,
//     filename: (req, file, cb) => {
//         const ext = '.' + file.originalname.split('.')[1];
//         const fileName = Array(32).fill(null)
//             .map(() => Math.round(Math.random() * 16).toString(16)).join('');
//         const uniqueFileName = `${fileName}${ext}`;
//         req.filenames = req.filenames || []; // Initialize filenames array if it doesn't exist
//         req.filenames.push(uniqueFileName); // Add the filename to the array
//         cb(null, uniqueFileName);
//     }
// });
const upload = (folderName) => multer({
    storage: storage(folderName)
}).array('pictures');

const saveImage = (folderName) => (req, res, next) => {
    const uploader = upload(folderName);
    uploader(req, res, function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        } else {
            if (!req.file) return next();
            req.fileName = req.file.filename;
        }
        next();
    })
};


module.exports = saveImage;