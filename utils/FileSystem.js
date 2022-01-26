import fs from 'fs-extra'

export class FileSystem {
  constructor() {
    if (FileSystem.instance instanceof FileSystem) {
      return FileSystem.instance
    }
    Object.freeze(this)
    FileSystem.instance = this
  }

  /**
   *
   * @param {string} source
   * @param {string} destination
   * @returns {boolean}
   */
  copy(source, destination) {
    try {
      fs.copySync(source, destination)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @returns {boolean}
   */
  createFolder(path) {
    try {
      fs.ensureDirSync(path)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @returns {boolean}
   */
  createFile(path) {
    try {
      fs.ensureFileSync(path)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} source
   * @param {string} destination
   * @returns {boolean}
   */
  createLink(source, destination) {
    try {
      fs.ensureLinkSync(source, destination)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @returns {boolean}
   */
  emptyDir(path) {
    try {
      fs.emptyDirSync(path)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @returns {boolean}
   */
  exist(path) {
    return fs.pathExistsSync(path)
  }

  /**
   *
   * @param {string} source
   * @param {string} destination
   * @returns {boolean}
   */
  move(source, destination, overwrite) {
    const options = {
      overwrite,
    }

    try {
      fs.moveSync(source, destination, options)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @returns {boolean}
   */
  readJson(path) {
    try {
      return fs.readJsonSync(path, { throws: false })
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @returns
   */
  readFolder(path) {
    try {
      return fs.readdirSync(path, { encoding: 'UTF8' })
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @returns
   */
  readFile(path) {
    try {
      return fs.readFileSync(path, { encoding: 'UTF8' })
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @returns {boolean}
   */
  remove(path) {
    try {
      fs.removeSync(path)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @param {string} content
   * @returns {boolean}
   */
  writeFile(path, content) {
    try {
      fs.outputFileSync(path, content)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   *
   * @param {string} path
   * @param {object} object
   * @returns {boolean}
   */
  writeJson(path, object) {
    try {
      fs.writeJsonSync(path, object)
      return true
    } catch (error) {
      return false
    }
  }
}
