const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/posters'); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Renombra el archivo con un timestamp
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
