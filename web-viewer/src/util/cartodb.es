import jsonp from 'jsonp'

import R from 'ramda'


export function layersFromViz(vizUrl, callback) {
  jsonp(vizUrl, null, (vizError, vizData) => {
    if (vizError) {
      console.vizErroror(vizError.message)
      callback(vizError)
    }
    else {
      const namedMapLayer = R.find((layer) => layer.type === 'namedmap', vizData.layers)
      const template = namedMapLayer.options.named_map.name
      const namedMapUrl = `https://tnris.cartodb.com/api/v1/map/named/${template}/jsonp`

      jsonp(namedMapUrl, (namedMapError, namedMapData) => {
        if (namedMapError) {
          callback(namedMapError)
        }
        else {
          const urls = {
            tile: `https://${namedMapData.cdn_url.https}/tnris/api/v1/map/${namedMapData.layergroupid}/{z}/{x}/{y}.png`
          }
          callback(null, urls)
        }
      })
    }
  })
}
