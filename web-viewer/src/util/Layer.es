export default class Layer {
  constructor(map) {
    this.status = 'pending'
    this.map = map
  }

  addTo() {
    throw new Error('addTo is undefined')
  }

  removeFrom() {
    throw new Error('removeFrom is undefined')
  }

  setStatus(status) {
    this.status = status
  }
}
