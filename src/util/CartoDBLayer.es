import axios from 'axios'
import condenseWhitespace from 'condense-whitespace'
import objectAssign from 'object-assign'

import Layer from './Layer'

const floodCartoCSS = require('./cartodb/nws-ahps-gauges-texas.mss')
const reservoirCartoCSS = require('./cartodb/reservoir-conditions.mss')

const layerConfigs = {
  'ahps-flood': {
    sql: `
      SELECT * FROM nws_ahps_gauges_texas_copy
    `,
    interactivity: [
      'lid',
      'name',
      'hydrograph_image',
      'hydrograph_link',
    ],
    cartocss: floodCartoCSS,
  },
  'wdft-reservoirs': {
    sql: `
      SELECT * from wdft_reservoirs_combined_copy
    `,
    interactivity: [
      'name',
      'reservoir_page',
      'recent_graph',
      'percent_full_copy',
    ],
    cartocss: reservoirCartoCSS,
  }
}


function getLayerFromConfig(opts) {
  const mapConfig = {
    version: "1.0.1",
    layers: [{
      type: 'mapnik',
      options: objectAssign({}, {cartocss_version: "2.3.0"}, opts)
    }]
  }

  return axios.post('https://tnris.cartodb.com/api/v1/map/', mapConfig)
    .then(({data}) => {
      const layerid = data.layergroupid
      const urls = {
        tilesUrl: `https://tnris.cartodb.com/api/v1/map/${layerid}/{z}/{x}/{y}.png`
      }
      if (opts.interactivity) {
        urls.gridsUrl = `https://tnris.cartodb.com/api/v1/map/${layerid}/0/{z}/{x}/{y}.grid.json`
      }
      return urls
    })
}

function getLayer(name) {
  const config = layerConfigs[name]
  const mapOptions = objectAssign({}, config, {
    sql: condenseWhitespace(config.sql),
  })

  return getLayerFromConfig(mapOptions)
}


export default class CartoDBLayer extends Layer {
  constructor(map, {name, utfGridEvents}) {
    super(map)

    this.name = name
    this.utfGridEvents = utfGridEvents
    this.utfGridLayer

    this.update()
  }

  update() {
    getLayer(this.name)
      .then((data) => {
        this.tileLayer = L.tileLayer(data.tilesUrl)
        this.status = 'ready'

        if (data.gridsUrl && this.utfGridEvents) {
          const utfGridLayer = L.utfGrid(data.gridsUrl, {
            useJsonP: false
          })

          R.toPairs(this.utfGridEvents).forEach(([eventType, handler]) => {
            utfGridLayer.on(eventType, handler)
          })

          this.utfGridLayer = utfGridLayer
        }
      })
  }

  show() {
    if (this.status === 'ready') {
      if (this.tileLayer && !this.map.hasLayer(this.tileLayer)) {
        this.map.addLayer(this.tileLayer)
      }
      if (this.utfGridLayer && !this.map.hasLayer(this.utfGridLayer)) {
        this.map.addLayer(this.utfGridLayer)
      }
    }
  }

  hide() {
    if (this.tileLayer && this.map.hasLayer(this.tileLayer)) {
      this.map.removeLayer(this.tileLayer)
    }
    if (this.utfGridLayer && this.map.hasLayer(this.utfGridLayer)) {
      this.map.removeLayer(this.utfGridLayer)
    }
  }
}
