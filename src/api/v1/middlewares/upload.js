const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    try {
      // cb(null, "D:/xampp/htdocs/BitBaroda/Backend/src/api/v1/uploads")
      cb(null, "/var/www/html/Bitbaroda/Frontend/public/uploads/")
    } catch (e) {
      cb(e, false)
    }
  }, filename: function (req, file, cb) {
    const date = new Date();
    let d = date.getDate().toString();
    let m = date.getMonth() + 1;
    let y = date.getFullYear().toString();
    var currentDate = y + m + d;
    cb(null, file.fieldname + '_' + currentDate + '_' + Date.now() + '_' + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
});

var singleUpload = upload.fields([{ name: 'file' }])

module.exports = { singleUpload };