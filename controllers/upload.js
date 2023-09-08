const express = require('express')
const multer = require('multer')
const { fileURLToPath } = require('url')
const path = require("path")
const userExtractor = require('../middlewares/userExtractor')

const CURRENT_DIR = path.join(__dirname)
const MIMETYPES = ['image/png','image/jpg','image/jpeg']

const multerUpload = multer({
    storage: multer.diskStorage({
      destination: path.join(CURRENT_DIR, "../uploads"),
      filename: (req, file, callback) => {
        const extension = path.extname(file.originalname) //extname extracts extension from a string
        const fileName = file.originalname.split(extension)[0]
        callback(null, `${fileName}${Date.now()}${extension}`)
      }

    }),
    fileFilter: (req, file, callback) => {
        if(MIMETYPES.includes(file.mimetype)) callback(null, true) //<-- NULL significa que no hubo ningún error, porque es error-first el cb, y true de que el archivo es correcto
        else {
          callback(new Error(`Only ${MIMETYPES.join(' ')} are allowed`))}
      }
})
const uploadRouter = express.Router()

uploadRouter.post("/", userExtractor, multerUpload.single("file"), (req, res) => {

    req.file.fileUrl = req.protocol + "://" + req.headers.host + "/media/" + req.file.filename
    res.status(200).json(req.file)

})

module.exports = uploadRouter