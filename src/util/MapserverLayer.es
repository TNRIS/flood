import L from 'leaflet'
import { store } from '../store'
import { retrieveGageStatus } from '../actions/InitializationActions'
import { mapClickHandler } from '../actions/MapActions'
import Layer from './Layer'

function getLayer(options) {
  let mapfileLayer = 'all'
  const urls = {
    tilesUrl: `https://mapserver.tnris.org/wms/?map=/tnris_mapfiles/${options.mapfile}.map&mode=tile&tilemode=gmap&tile={x}+{y}+{z}&layers=${mapfileLayer}&map.imagetype=png`
  }
  if (options.interactivity) {
    mapfileLayer = options.interactivity
    urls.gridsUrl = `https://mapserver.tnris.org/wms/?map=/tnris_mapfiles/${options.mapfile}.map&mode=tile&tilemode=gmap&tile={x}+{y}+{z}&layers=${mapfileLayer}&map.imagetype=utfgrid`
  }
  return urls
}

export default class MapserverLayer extends Layer {
  constructor({id, map, handlers, mapfile, interactivity, attribution, refreshTimeMs = 7200000}) {
    super({id, map, handlers})

    this.mapfile = mapfile
    this.interactivity = interactivity
    this.attribution = attribution
    this.utfGridLayer

    this.refreshTimeMs = refreshTimeMs
    this.update()
    this.refreshIntervalId = setInterval(() => this.refresh(), this.refreshTimeMs)
  }

  update() {
    this.setStatus('updating')
    store.dispatch(retrieveGageStatus())

    const data = getLayer({mapfile: this.mapfile, interactivity: this.interactivity})

    let previousTileLayer
    let previousUtfGridLayer

    const currentlyVisible = (this.tileLayer && this.map.hasLayer(this.tileLayer))
    if (currentlyVisible) {
      previousTileLayer = this.tileLayer
      previousUtfGridLayer = this.utfGridLayer
    }

    this.tileLayer = L.tileLayer(data.tilesUrl, {attribution: this.attribution})

    if (data.gridsUrl) {
      const utfGridLayer = L.utfGrid(data.gridsUrl, {
        useJsonP: false
      })

      utfGridLayer.on('click', (event) => {
        store.dispatch(mapClickHandler(this.id, event, event.latlng, event))
      })

      this.utfGridLayer = utfGridLayer
    }

    if (currentlyVisible && previousTileLayer) {
      this.map.removeLayer(previousTileLayer)
      this.map.addLayer(this.tileLayer)

      //  This will set the visible layer order relative to
      //  the order set in TileLayer.es and AnimatedWeatherLayer.es
      switch (this.id) {
        case "ahps-flood":
          this.tileLayer.setZIndex(99)
          break
        case "reservoir-conditions":
          this.tileLayer.setZIndex(98)
          break
        default:
          null
      }

      if (previousUtfGridLayer) {
        this.map.removeLayer(previousUtfGridLayer)
        this.map.addLayer(this.utfGridLayer)
      }
    }

    this.setStatus('ready')
  }

  refresh() {
    this.update()
  }

  show() {
    if (this.status === 'ready') {
      if (this.tileLayer && !this.map.hasLayer(this.tileLayer)) {
        this.map.addLayer(this.tileLayer)

        // This will set the visible layer order relative to the order set in TileLayer.es
        switch (this.id) {
          case "ahps-flood":
            this.tileLayer.setZIndex(99)
            break
          case "reservoir-conditions":
            this.tileLayer.setZIndex(98)
            break
          default:
            null
        }
      }
      if (this.utfGridLayer && !this.map.hasLayer(this.utfGridLayer)) {
        this.map.addLayer(this.utfGridLayer)
      }
    }
  }

  hide() {
    const popupData = store.getState().popupData
    if (popupData.id) {
      if (popupData.id === this.id) {
        this.map.closePopup()
      }
    }

    if (this.tileLayer && this.map.hasLayer(this.tileLayer)) {
      this.map.removeLayer(this.tileLayer)
    }
    if (this.utfGridLayer && this.map.hasLayer(this.utfGridLayer)) {
      this.map.removeLayer(this.utfGridLayer)
    }
  }
}
