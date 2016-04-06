import axios from 'axios'
import condenseWhitespace from 'condense-whitespace'
import L from 'leaflet'
import objectAssign from 'object-assign'

import Layer from './Layer'

function getLayer(options) {
  const mapConfig = {
    version: "1.0.1",
    layers: [{
      type: 'mapnik',
      options: objectAssign(
        {
          sql: condenseWhitespace(options.sql),
          cartocss_version: "2.3.0",
        },
        options
      )
    }]
  }

  return axios.post('https://tnris.cartodb.com/api/v1/map/', mapConfig)
    .then(({data}) => {
      const layerid = data.layergroupid
      const urls = {
        tilesUrl: `https://tnris.cartodb.com/api/v1/map/${layerid}/{z}/{x}/{y}.png`
      }
      if (options.interactivity) {
        urls.gridsUrl = `https://tnris.cartodb.com/api/v1/map/${layerid}/0/{z}/{x}/{y}.grid.json`
      }
      return urls
    })
}


export default class CartoDBLayer extends Layer {
  constructor({id, map, handlers, sql, interactivity, cartocss, attribution}) {
    super({id, map, handlers})

    this.cartocss = cartocss
    this.interactivity = interactivity
    this.sql = sql
    this.attribution = attribution

    this.utfGridLayer
    this.update()
  }

  update() {
    getLayer({cartocss: this.cartocss, interactivity: this.interactivity, sql: this.sql})
      .then((data) => {
        this.tileLayer = L.tileLayer(data.tilesUrl, {attribution: this.attribution})

        if (data.gridsUrl) {
          const utfGridLayer = L.utfGrid(data.gridsUrl, {
            useJsonP: false
          })

          utfGridLayer.on('click', this.handlers.onClickUTFGrid)
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
