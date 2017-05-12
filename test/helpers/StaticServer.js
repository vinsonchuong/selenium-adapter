import * as http from 'http'
import * as nodeStatic from 'node-static'

export default class {
  constructor (directory, port) {
    this.staticServer = new nodeStatic.Server(directory.path())
    this.httpServer = new http.Server()
    this.httpServer.on('request', (request, response) => {
      request.on('end', () => {
        this.staticServer.serve(request, response)
      })
      request.resume()
    })
    this.httpServer.listen(port)
  }

  async exit () {
    await new Promise((resolve, reject) => {
      this.httpServer.close((error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }
}
