export default class Layer {
  constructor() {
    this.status = 'pending'
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
