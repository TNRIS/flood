import axios from 'axios'
import condenseWhitespace from 'condense-whitespace'
import objectAssign from 'object-assign'

import Layer from './Layer'

const floodCartoCSS = require('./cartodb/nws-ahps-gauges-texas.mss')
const floodSQL = require('./cartodb/nws-ahps-gauges-texas.sql')
const reservoirCartoCSS = require('./cartodb/reservoir-conditions.mss')
const reservoirSQL = require('./cartodb/reservoir-conditions.sql')

const layerConfigs = {
  'ahps-flood': {
    sql: floodSQL,
    interactivity: [
      'lid',
      'name',
      'hydrograph_image',
      'hydrograph_link',
    ],
    cartocss: floodCartoCSS,
  },
  'reservoir-conditions': {
    sql: reservoirSQL,
    interactivity: [
      'full_name',
      'lake_condensed_name',
      'flood_height_percent',
      'conservation_pool_elevation',
      'top_of_dam_elevation',
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

function getLayer(id) {
  const config = layerConfigs[id]
  const mapOptions = objectAssign({}, config, {
    sql: condenseWhitespace(config.sql),
  })

  return getLayerFromConfig(mapOptions)
}


export default class CartoDBLayer extends Layer {
  constructor({id, map, handlers}) {
    super({id, map, handlers})
    this.utfGridLayer

    this.update()
  }

  update() {
    getLayer(this.id)
      .then((data) => {
        this.tileLayer = L.tileLayer(data.tilesUrl)

        if (data.gridsUrl) {
          const utfGridLayer = L.utfGrid(data.gridsUrl, {
            useJsonP: false
          })

          utfGridLayer.on('mouseover', this.handlers.onMouseoverUTFGrid)
          utfGridLayer.on('mouseout', this.handlers.onMouseoutUTFGrid)

          this.utfGridLayer = utfGridLayer
        }

        this.setStatus('ready')
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
