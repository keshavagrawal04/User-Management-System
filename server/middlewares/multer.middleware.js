const multer = require('multer');

// FUNCTION : Upload Files In Local Directory
const storage = multer.diskStorage({
    filename: (req, file, callBack) => {
        callBack(null, file.originalname);
    }
})

const upload = multer({ storage });

module.exports = { upload };
