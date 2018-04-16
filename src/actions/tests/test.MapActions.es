import { expect } from 'chai'

import {
  CLEAR_CENTER_AND_ZOOM,
  SET_CENTER_AND_ZOOM,
  CHANGE_LAYER_STATUS,
  SET_BASE_LAYER,
  SET_FEATURE_LAYER
} from '../../constants/MapActionTypes'

import {
  clearCenterAndZoom,
  mapClickHandler,
  setCenterAndZoom,
  layerStatusChange,
  setBaseLayer,
  setFeatureLayer
} from '../MapActions'

describe('actions: MapActions', () => {
  const sampleLat = 30.33081
  const sampleLng = -97.70691
  const sampleZoom = 12

  it('should create action to clear the center and zoom values from store.map', () => {
    const expectedAction = {
      type: CLEAR_CENTER_AND_ZOOM
    }
    expect(clearCenterAndZoom()).to.deep.equal(expectedAction)
  })

  it('register a click from the map and create the action to handle to event', () => {
    expect(mapClickHandler()).to.be.a('function')
  })

  it('should create action to set the center and zoom of the map in the store', () => {
    const expectedAction = {
      type: SET_CENTER_AND_ZOOM,
      lat: sampleLat,
      lng: sampleLng,
      zoom: sampleZoom
    }
    expect(setCenterAndZoom(sampleLat, sampleLng, sampleZoom)).to.deep.equal(expectedAction)
  })

  it('should create an action to change layer status', () => {
    const id = 'hi'
    const status = 'ready'

    const expectedAction = {
      type: CHANGE_LAYER_STATUS,
      id,
      status
    }
    expect(layerStatusChange(id, status)).to.deep.equal(expectedAction)
  })

  it('should create an action for setting base layer', () => {
    const id = 'testbaselayer'

    const expectedAction = {
      type: SET_BASE_LAYER,
      id
    }
    expect(setBaseLayer(id)).to.deep.equal(expectedAction)
  })

  it('should create an action for setting feature layer', () => {
    const id = 'testbaselayer'

    const expectedAction = {
      type: SET_FEATURE_LAYER,
      id
    }
    expect(setFeatureLayer(id)).to.deep.equal(expectedAction)
  })
})
