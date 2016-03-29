import { layerStatusChange } from '../actions'


export default class Layer {
  constructor(id, map) {
    this.id = id
    this.map = map
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
    layerStatusChange(this.id, status)
  }
}
