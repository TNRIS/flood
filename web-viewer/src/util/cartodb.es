import axios from 'axios'
import condenseWhitespace from 'condense-whitespace'
import extend from 'extend'


const layerConfigs = {
  'ahps-flood': {
    sql: `
      SELECT * FROM nws_ahps_gauges_texas_copy
    `,
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
      SELECT * from wdft_reservoirs_combined
    `,
    cartocss: `
      Map {
        buffer-size: 128;
      }

      #wdft_reservoirs_combined{
        polygon-fill: #FF6600;
        polygon-opacity: 0.7;
        line-color: #FFF;
        line-width: 0.5;
        line-opacity: 1;
      }
    `,
  }
}


function getLayerFromConfig(opts) {
  const mapConfig = {
    version: "1.0.1",
    layers: [{
      type: 'mapnik',
      options: extend({cartocss_version: "2.3.0"}, opts)
    }]
  }

  return axios.post('https://tnris.cartodb.com/api/v1/map/', mapConfig)
    .then(({data}) => {
      const layerid = data.layergroupid
      const tilesUrl = `https://tnris.cartodb.com/api/v1/map/${layerid}/{z}/{x}/{y}.png`
      if (opts.interactivity) {
        return {
          tilesUrl,
          gridUrl: `https://tnris.cartodb.com/api/v1/map/${layerid}/0/{z}/{x}/{y}.grid.json`
        }
      }
      return {tilesUrl}
    })
}

export function getLayer(name) {
  const config = layerConfigs[name]
  const mapOptions = {
    sql: condenseWhitespace(config.sql),
    cartocss: config.cartocss,
  }
  return getLayerFromConfig(mapOptions)
}
