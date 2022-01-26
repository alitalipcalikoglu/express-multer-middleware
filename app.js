import 'dotenv/config'
import express from 'express'

import { handleUpload } from './middlewares/multer.js'
import { FileSystem } from './utils/FileSystem.js'

const fs = new FileSystem()

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.end(fs.readFile('views/index.html'))
})

app.get('/single', (req, res) => {
  res.end(fs.readFile('views/single-upload.html'))
})

app.post('/single', handleUpload(fs).single('file'), (req, res) => {
  if (!req.file) return res.json({ status: false, message: 'please select file' })
  res.json({ status: true, message: 'OK' })
})

app.get('/multiple', (req, res) => {
  res.end(fs.readFile('views/multiple-upload.html'))
})

app.post('/multiple', (req, res) => {
  const handleUploadFiles = handleUpload(fs).array('files', 5)
  handleUploadFiles(req, res, (err) => {
    if (req.files.length < 1) return res.json({ status: false, message: 'please select file / files' })
    if (!err) return res.json({ status: true, message: 'File / Files Uploaded' })
    if ((err.code = 'LIMIT_UNEXPECTED_FILE')) {
      return res.json({ status: false, message: 'LIMIT_UNEXPECTED_FILE' })
    }
  })
})

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})
