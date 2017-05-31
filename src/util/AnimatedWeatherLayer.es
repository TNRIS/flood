import axios from 'axios'
import L from 'leaflet'
import R from 'ramda'

import keys from '../keys'
import Layer from './Layer'

import {store} from '../store'

export default class AnimatedWeatherLayer extends Layer {
  constructor(options) {
    super(options)

    this.timestampLayers = {}
    this.visibleTimestamp
    this.defaultAnimationInterval = 800
    this.animationTimeout
    this.limit = 5
    this.animate = false

    this.setStatus('not ready')
  }

  update() {
    this.setStatus('loading')

    return axios.get(`https://maps.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar.json`)
      .then(({ data }) => {
        const baseUrl = `https://maps{s}.aerisapi.com/${keys.aerisApiId}_${keys.aerisApiSecret}/radar/{z}/{x}/{y}/`
        let frames
        if (this.animate) {
          frames = [data.files[0], data.files[5], data.files[10], data.files[15], data.files[20]]
        }
        else {
          frames = R.of(data.files[0])
        }

        const frameTimes = R.pluck('time')(frames)
        const recentTimestamps = R.reverse(frameTimes)
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
        }, 1000 * 60 * 6)
      })
  }

  show() {
    if (this.status === 'not ready') {
      this.update()
    }
    else {
      const setVisible = (layer) => {
        if (!this.map.hasLayer(layer)) {
          layer.addTo(this.map)
        }
        //  This will set the visible layer order relative to
        //  the order set in CartoDBLayer.es and TileLayer.es
        layer.setZIndex(96)
        layer.setOpacity(0.8)
      }

      const setTimestamp = (time) => {
        const t = time
        const m = t.substr(4, 2) - 1
        const date = new Date(Date.UTC(t.substr(0, 4), m, t.substr(6, 2), t.substr(8, 2), t.substr(10, 2)))
        this.handlers.updateTimestamp(date.toLocaleString())
      }

      if (this.status === 'ready' && !this.animationTimeout) {
        R.values(this.timestampLayers).forEach(({layer}) => {
          layer.addTo(this.map).bringToFront()
          layer.setOpacity(0)
        })

        this.visibleTimestamp = R.keys(this.timestampLayers)[0]
        const firstLayer = this.timestampLayers[this.visibleTimestamp].layer
        setVisible(firstLayer)

        setTimestamp(this.visibleTimestamp)

        if (this.animate) {
          const cycleWeatherLayer = () => {
            const previousTimestampLayer = this.timestampLayers[this.visibleTimestamp]
            if (previousTimestampLayer) {
              previousTimestampLayer.layer.setOpacity(0)
            }

            const timestamps = R.keys(this.timestampLayers).sort()
            let i = R.indexOf(this.visibleTimestamp, timestamps)
            i = ++i % this.limit

            this.visibleTimestamp = timestamps[i]
            const nextTimestampLayer = this.timestampLayers[this.visibleTimestamp]
            setVisible(nextTimestampLayer.layer)

            setTimestamp(nextTimestampLayer.timestamp)

            let interval = this.defaultAnimationInterval
            if (nextTimestampLayer.status !== 'ready') {
              interval = 1000
            }
            else if (i === (this.limit - 1)) {
              interval = 1500
            }

            this.animationTimeout = setTimeout(cycleWeatherLayer, interval)
          }

          cycleWeatherLayer()
        }
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

  toggleAnimation() {
    this.animate = !this.animate
    this.setStatus('not ready')
    clearTimeout(this.animationTimeout)
    delete this.animationTimeout
    this.update()
  }
}
