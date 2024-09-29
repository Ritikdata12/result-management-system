const express = require('express');
const { uploadMarks } = require('../Controllers/Admincontroller');
const auth = require('../middleware/authmiddle');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload/marks', auth, upload.single('file'), uploadMarks);

module.exports = router;