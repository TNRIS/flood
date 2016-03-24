import axios from 'axios'
import R from 'ramda'

import keys from '../keys'
import Layer from './Layer'

export default class AnimatedWeatherLayer extends Layer {
  constructor(map, options) {
    super(map)

    this.layers = {}
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
        recentTimestamps.forEach((time) => {
          if (!this.layers[time]) {
            this.layers[time] = L.tileLayer(`${baseUrl}${time}.png`, {
              subdomains: '1234',
              opacity: 0,
              attribution: 'Aeris Weather'  //TODO: proper attribution
            })
          }
        })

        const allTimestamps = R.keys(this.layers)
        const dropTimestamps = R.difference(allTimestamps, recentTimestamps)
        dropTimestamps.forEach((dropTimestamp) => {
          const dropLayer = this.layers[dropTimestamp]
          if (this.map.hasLayer(dropLayer)) {
            this.map.removeLayer(dropLayer)
          }
          delete this.layers[dropTimestamp]
        })

        this.setStatus('ready')

        this.updateTimeout = setTimeout(() => {
          this.update()
        }, 1000 * 60 * 3)
      })
  }

  show() {
    if (this.status === 'ready' && !this.weatherLayerTimeout) {
      R.values(this.layers).forEach((layer) => {
        layer.addTo(this.map).bringToFront()
        layer.setOpacity(0)
      })

      this.visibleTimestamp = R.keys(this.layers)[0]

      const cycleWeatherLayer = () => {
        this.layers[this.visibleTimestamp].setOpacity(0)

        const timestamps = R.keys(this.layers).sort()
        let i = R.indexOf(this.visibleTimestamp, timestamps)
        if (++i >= this.limit) {
          i = 0
        }

        this.visibleTimestamp = timestamps[i]

        const nextLayer = this.layers[this.visibleTimestamp]
        if (!this.map.hasLayer(nextLayer)) {
          nextLayer.addTo(this.map).bringToFront()
        }
        nextLayer.setOpacity(0.8)

        this.weatherLayerTimeout = setTimeout(cycleWeatherLayer, this.validTimeInterval)
      }

      cycleWeatherLayer()
    }
  }

  hide() {
    if (this.weatherLayerTimeout) {
      clearTimeout(this.weatherLayerTimeout)
      this.weatherLayerTimeout = null
    }

    R.values(this.layers).forEach((layer) => {
      if (this.map.hasLayer(layer)) {
        this.map.removeLayer(layer)
      }
    })
  }
}
