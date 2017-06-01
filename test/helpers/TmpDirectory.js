/* @flow */
import Directory from 'directory-helpers'
import tempfile from 'tempfile'

type StringMap = {[string]: string}

export default class {
  directory: Directory

  constructor () {
    this.directory = new Directory(tempfile())
  }

  async write (files: StringMap): Promise<StringMap> {
    await this.directory.write(files)

    const fileUrls = {}
    for (const fileName of Object.keys(files)) {
      fileUrls[fileName] = `file://${this.directory.path(fileName)}`
    }
    return fileUrls
  }

  remove (): Promise<void> {
    return this.directory.remove()
  }
}
