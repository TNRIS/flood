import axios from 'axios'
import R from 'ramda'

import keys from '../keys'
import Layer from './Layer'

export default class AnimatedWeatherLayer extends Layer {
  constructor(options) {
    super(options)

    this.timestampLayers = {}
    this.validTimeInterval
    this.visibleTimestamp
    this.animationTimeout
    this.limit = 20

    this.update()
  }

  update() {
    return axios.get(`http://maps.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar.json`)
      .then(({ data }) => {
        this.validTimeInterval = data.validTimeInterval

        const baseUrl = `https://tile{s}.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar/{z}/{x}/{y}/`
        const recentTimestamps = R.compose(R.reverse, R.pluck('time'), R.take(this.limit))(data.files)
        recentTimestamps.forEach((timestamp) => {
          if (!this.timestampLayers[timestamp]) {
            const layer = L.tileLayer(`${baseUrl}${timestamp}.png`, {
              subdomains: '1234',
              opacity: 0,
              attribution: '<a href="http://www.aerisweather.com">AerisWeather</a>'
            })
            this.timestampLayers[timestamp] = {
              layer: layer,
              timestamp: timestamp,
              status: 'new',
            }
            layer.once('loading', () => {
              this.setStatus('loading')
              this.timestampLayers[timestamp].status = 'loading'
            })
            layer.once('load', () => {
              this.timestampLayers[timestamp].status = 'loaded'
              const stati = R.pluck('status')(R.values(this.timestampLayers)).filter((status) => status !== 'loaded')
              if (stati.length === 0) {
                this.setStatus('ready')
              }
            })
          }
        })

        const allTimestamps = R.keys(this.timestampLayers)
        const dropTimestamps = R.difference(allTimestamps, recentTimestamps)
        dropTimestamps.forEach((dropTimestamp) => {
          const dropLayer = this.timestampLayers[dropTimestamp].layer
          if (this.map.hasLayer(dropLayer)) {
            this.map.removeLayer(dropLayer)
          }
          delete this.timestampLayers[dropTimestamp]
        })

        this.setStatus('ready')

        this.updateTimeout = setTimeout(() => {
          this.update()
        }, 1000 * 60 * 3)
      })
  }

  show() {
    const setVisible = (layer) => {
      if (!this.map.hasLayer(layer)) {
        layer.addTo(this.map).bringToFront()
      }
      layer.setOpacity(0.8)
    }

    if (this.status === 'ready' && !this.animationTimeout) {
      R.values(this.timestampLayers).forEach(({layer}) => {
        layer.addTo(this.map).bringToFront()
        layer.setOpacity(0)
      })

      this.visibleTimestamp = R.keys(this.timestampLayers)[0]
      const firstLayer = this.timestampLayers[this.visibleTimestamp].layer
      setVisible(firstLayer)

      const cycleWeatherLayer = () => {
        const previousTimestampLayer = this.timestampLayers[this.visibleTimestamp]
        previousTimestampLayer.layer.setOpacity(0)

        const timestamps = R.keys(this.timestampLayers).sort()
        let i = R.indexOf(this.visibleTimestamp, timestamps)
        if (++i >= this.limit) {
          i = 0
        }
        this.visibleTimestamp = timestamps[i]
        const nextTimestampLayer = this.timestampLayers[this.visibleTimestamp]
        setVisible(nextTimestampLayer.layer)

        const interval = (nextTimestampLayer.status === 'loaded') ? this.validTimeInterval : 2000
        this.animationTimeout = setTimeout(cycleWeatherLayer, interval)
      }

      cycleWeatherLayer()
    }
  }

  hide() {
    clearTimeout(this.animationTimeout)
    this.animationTimeout = null

    R.values(this.timestampLayers).forEach((timestampLayer) => {
      const layer = timestampLayer.layer
      if (this.map.hasLayer(layer)) {
        this.map.removeLayer(layer)
      }
    })
  }
}
