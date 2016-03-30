export default class Layer {
  constructor({ id, map, handlers }) {
    this.id = id
    this.map = map
    this.handlers = handlers
    this.setStatus('pending')
  }

  show() {
    throw new Error('show is undefined')
  }

  hide() {
    throw new Error('hide is undefined')
  }

  setStatus(status) {
    this.status = status
    this.handlers.layerStatusChange(this.id, status)
  }
}
