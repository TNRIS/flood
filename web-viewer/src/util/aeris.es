import axios from 'axios'
import R from 'ramda'

import keys from '../keys'
import Layer from './Layer'

export class AnimatedWeatherLayer extends Layer {
  constructor() {
    super()

    this.layers = []
    this.validTimeInterval
    this.weatherLayerTimeout
    this.limit = 20

    this.update()
  }

  update() {
    return axios.get(`http://maps.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar.json`)
      .then(({ data }) => {
        this.validTimeInterval = data.validTimeInterval

        const baseUrl = `https://tile{s}.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar/{z}/{x}/{y}/`
        const recentTimestamps = R.compose(R.reverse, R.pluck('time'), R.take(this.limit))(data.files)
        this.layers = recentTimestamps.map((time) => {
          return L.tileLayer(`${baseUrl}${time}.png`, {
            subdomains: '1234',
            opacity: 0,
            attribution: 'Aeris Weather'
          })
        })
      })
  }

  addTo(map) {
    if (!this.weatherLayerTimeout) {
      this.layers.forEach((layer) => {
        layer.addTo(map).bringToFront()
      })

      let i = 0
      const showWeatherLayer = () => {
        this.layers.forEach((lyr) => lyr.setOpacity(0))
        this.layers[i++].setOpacity(0.8)
        if (i >= this.limit) {
          i = 0
        }
        this.weatherLayerTimeout = setTimeout(showWeatherLayer, this.validTimeInterval)
      }

      showWeatherLayer()
    }
  }

  removeFrom(map) {
    if (this.weatherLayerTimeout) {
      clearTimeout(this.weatherLayerTimeout)
      this.weatherLayerTimeout = null
    }

    this.layers.forEach((layer) => {
      if (map.hasLayer(layer)) {
        map.removeLayer(layer)
      }
    })
  }
}
