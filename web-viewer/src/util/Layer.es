export default class Layer {
  constructor(map) {
    this.status = 'pending'
    this.map = map
  }

  show() {
    throw new Error('show is undefined')
  }

  hide() {
    throw new Error('hide is undefined')
  }

  setStatus(status) {
    this.status = status
  }
}
