import multer from 'multer'
import path from 'path'

/**
 *
 * @param {fs} fileSystem
 * @param {{folderName: string, prefix: string, suffix: string}} options
 * @returns {multer}
 */
export const handleUpload = (fileSystem, options) => {
  const multerOptions = {
    folderName: undefined,
    prefix: undefined,
    suffix: undefined,
    ...options,
  }

  const baseUploadPath = 'public/uploads'
  const uploadFullPath = multerOptions.folderName ? `${baseUploadPath}/${multerOptions.folderName}` : baseUploadPath

  if (!fileSystem.exist(uploadFullPath)) fileSystem.createFolder(uploadFullPath)

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFullPath)
    },

    filename: (req, file, cb) => {
      const date = new Date().toLocaleString().replace(/[.]/g, '-').replace(/:/g, '-').split(' ').join('-')
      const randomString = Math.random().toString(36).substring(2)
      const fileName = `${date}-${randomString}`
      const fileExtension = path.parse(file.originalname).ext
      multerOptions.prefix = multerOptions.prefix ? `${multerOptions.prefix}-` : ''
      multerOptions.suffix = multerOptions.suffix ? `-${multerOptions.suffix}` : ''
      const fullFileName = `${multerOptions.prefix}${fileName}${multerOptions.suffix}${fileExtension}`
      cb(null, fullFileName)
    },
  })

  return multer({ storage: storage })
}
