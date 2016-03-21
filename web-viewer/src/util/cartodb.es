import axios from 'axios'
import condenseWhitespace from 'condense-whitespace'
import objectAssign from 'object-assign'

import Layer from './Layer'


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
    cartocss: `
      Map {
        buffer-size: 128;
      }

      #nws_ahps_gauges_texas{
        marker-fill-opacity: 0.9;
        marker-line-color: #FFF;
        marker-line-width: 1;
        marker-line-opacity: 1;
        marker-placement: point;
        marker-type: ellipse;
        marker-width: 10;
        marker-fill: #FF6600;
        marker-allow-overlap: true;

        [obs_status = "666666"] {
          marker-fill: #666666
        }
        [obs_status = "906320"] {
          marker-fill: #906320
        }
        [obs_status = "ff9900"] {
          marker-fill: #ff9900
        }
        [obs_status = "bdc2bb"] {
          marker-fill: #bdc2bb
        }
        [obs_status = "ff0000"] {
          marker-fill: #ff0000
        }
        [obs_status = "72afe9"] {
          marker-fill: #72afe9
        }
        [obs_status = "00ff00"] {
          marker-fill: #00ff00
        }
      }
    `,
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
    cartocss: `
      @color0: #990000;
      @color10: #D73027;
      @color20: #F46D43;
      @color30: #FDAE61;
      @color40: #FFCC33;
      @color50: #FEE090;
      @color60: #FFFF99;
      @color70: #CCFFFF;
      @color80: #3399FF;
      @color90: #0000FF;

      Map {
        buffer-size: 128;
      }

      #wdft_reservoirs_combined {
        polygon-opacity: 0;
        line-opacity: 0;

        // order is important here - draw outline first then the fill on top

        ::outline {
         line-width: .5;
         line-opacity: 1;
        }
        ::fill {
          polygon-opacity: 1;
        }

        // set colors for each reservoir
        [percent_full_copy > 0][percent_full_copy <= 10] {
          ::fill {
            polygon-fill: @color0;
          }
          ::outline {
            line-color: lighten(@color0, 10);
          }
        }
        [percent_full_copy > 10][percent_full_copy <= 20] {
          ::fill {
            polygon-fill: lighten(@color10, 10);
          }
          ::outline {
            line-color: darken(@color10, 50);
          }
        }
        [percent_full_copy > 20][percent_full_copy <= 30] {
          ::fill {
            polygon-fill: lighten(@color20, 10);
          }
          ::outline {
            line-color: darken(@color20, 50);
          }
        }
        [percent_full_copy > 30][percent_full_copy <= 40] {
          ::fill {
            polygon-fill: @color30;
          }
          ::outline {
            line-color: darken(@color30, 50);
          }
        }
        [percent_full_copy > 40][percent_full_copy <= 50] {
          ::fill {
            polygon-fill: @color40;
          }
          ::outline {
            line-color: darken(@color40, 50);
          }
        }
        [percent_full_copy > 50][percent_full_copy <= 60] {
          ::fill {
            polygon-fill: @color50;
          }
          ::outline {
            line-color: darken(@color50, 50);
          }
        }
        [percent_full_copy > 60][percent_full_copy <= 70] {
          ::fill {
            polygon-fill: @color60;
          }
          ::outline {
            line-color: darken(@color60, 50);
          }
        }
        [percent_full_copy > 70][percent_full_copy <= 80] {
          ::fill {
            polygon-fill: @color70;
          }
          ::outline {
            line-color: darken(@color70, 50);
          }
        }
        [percent_full_copy > 80][percent_full_copy <= 90] {
          ::fill {
            polygon-fill: @color80;
          }
          ::outline {
            line-color: darken(@color80, 10);
          }
        }
        [percent_full_copy > 90][percent_full_copy <= 100] {
          ::fill {
            polygon-fill: @color90;
          }
          ::outline {
            line-color: lighten(@color90, 30);
          }
        }
      }
    `,
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

export function getLayer(name) {
  const config = layerConfigs[name]
  const mapOptions = objectAssign({}, config, {
    sql: condenseWhitespace(config.sql),
  })

  return getLayerFromConfig(mapOptions)
}


export class CartoDBLayer extends Layer {
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

  addTo(map) {
    if (this.status === 'ready') {
      if (this.tileLayer && !map.hasLayer(this.tileLayer)) {
        map.addLayer(this.tileLayer)
      }
      if (this.utfGridLayer && !map.hasLayer(this.utfGridLayer)) {
        map.addLayer(this.utfGridLayer)
      }
    }
  }

  removeFrom(map) {
    if (this.tileLayer && map.hasLayer(this.tileLayer)) {
      map.removeLayer(this.tileLayer)
    }
    if (this.utfGridLayer && map.hasLayer(this.utfGridLayer)) {
      map.removeLayer(this.utfGridLayer)
    }
  }
}
