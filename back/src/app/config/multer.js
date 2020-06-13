const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    path: path.resolve('src', 'app', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve('src', 'app', 'tmp', 'uploads'))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) callback(err);

                const filename = `${hash.toString('hex')}~${file.originalname}`;
                callback(null, filename);
            });
        }

    }),
    limits: {
        fileSize: 4194304,
    },
    fileFilter: (req, file, callback) => {
        const allowedMimes = [
            "image/jpeg",
            "image/png",
          ];
      
          if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
          } else {
            callback(new Error("Invalid file type."));
          }
    }
}