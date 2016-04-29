import axios from 'axios'
import L from 'leaflet'
import R from 'ramda'

import keys from '../keys'
import Layer from './Layer'

export default class AnimatedWeatherLayer extends Layer {
  constructor(options) {
    super(options)

    this.timestampLayers = {}
    this.visibleTimestamp
    this.animationInterval = 200
    this.animationTimeout
    this.limit = 20

    this.setStatus('not ready')
  }

  update() {
    this.setStatus('loading')

    return axios.get(`http://maps.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar.json`)
      .then(({ data }) => {
        const baseUrl = `https://tile{s}.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar/{z}/{x}/{y}/`
        const recentTimestamps = R.compose(R.reverse, R.pluck('time'), R.take(this.limit))(data.files)
        recentTimestamps.forEach((timestamp) => {
          if (!this.timestampLayers[timestamp]) {
            this.timestampLayers[timestamp] = {
              'timestamp': timestamp,
              'status': 'not ready',
            }
          }
        })
        recentTimestamps.forEach((timestamp) => {
          if (!this.timestampLayers[timestamp].layer) {
            const layer = L.tileLayer(`${baseUrl}${timestamp}.png`, {
              subdomains: '1234',
              opacity: 0,
              attribution: '<a href="http://www.aerisweather.com">AerisWeather</a>'
            })
            layer.once('loading', () => {
              this.setStatus('loading')
              this.timestampLayers[timestamp].status = 'loading'
            })
            layer.once('load', () => {
              this.timestampLayers[timestamp].status = 'ready'
              const timestampStatuses = R.pluck('status')(R.values(this.timestampLayers)).filter((status) => status !== 'ready')
              if (timestampStatuses.length === 0) {
                this.setStatus('ready')
              }
            })

            this.timestampLayers[timestamp].layer = layer
          }
        })

        const allTimestamps = R.keys(this.timestampLayers)
        const dropTimestamps = R.difference(allTimestamps, recentTimestamps)
        this.clearTimestamps(dropTimestamps)
        this.setStatus('ready')

        this.updateTimeout = setTimeout(() => {
          this.update()
        }, 1000 * 60 * 3)
      })
  }

  show() {
    if (this.status === 'not ready') {
      this.update()
    }
    else {
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
          if (previousTimestampLayer) {
            previousTimestampLayer.layer.setOpacity(0)
          }

          const timestamps = R.keys(this.timestampLayers).sort()
          let i = R.indexOf(this.visibleTimestamp, timestamps)
          if (++i >= this.limit) {
            i = 0
          }
          this.visibleTimestamp = timestamps[i]
          const nextTimestampLayer = this.timestampLayers[this.visibleTimestamp]
          setVisible(nextTimestampLayer.layer)

          const interval = (nextTimestampLayer.status === 'ready') ? this.animationInterval : 1000
          this.animationTimeout = setTimeout(cycleWeatherLayer, interval)
        }

        cycleWeatherLayer()
      }
    }
  }

  hide() {
    clearTimeout(this.animationTimeout)
    delete this.animationTimeout

    const allTimestamps = R.keys(this.timestampLayers)
    this.clearTimestamps(allTimestamps)
    this.setStatus('not ready')
  }

  clearTimestamps(dropTimestamps) {
    dropTimestamps.forEach((dropTimestamp) => {
      const dropLayer = this.timestampLayers[dropTimestamp].layer
      if (this.map.hasLayer(dropLayer)) {
        this.map.removeLayer(dropLayer)
      }
      delete this.timestampLayers[dropTimestamp]
    })
  }
}
