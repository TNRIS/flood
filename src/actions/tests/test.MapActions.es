import expect from 'expect'

import {
  CLEAR_CENTER_AND_ZOOM,
  SET_CENTER_AND_ZOOM
} from '../../constants/MapActionTypes'

import {
  clearCenterAndZoom,
  mapClickHandler,
  setCenterAndZoom
} from '../MapActions'

describe('actions: MapActions', () => {
  const sampleLat = 30.33081
  const sampleLng = -97.70691
  const sampleZoom = 12

  it('should create action to clear the center and zoom values from store.map', () => {
    const expectedAction = {
      type: CLEAR_CENTER_AND_ZOOM
    }
    expect(clearCenterAndZoom()).toEqual(expectedAction)
  })

  it('register a click from the map and create the action to handle to event', () => {
    expect(mapClickHandler()).toBeA('function')
  })

  it('should create action to set the center and zoom of the map in the store', () => {
    const expectedAction = {
      type: SET_CENTER_AND_ZOOM,
      lat: sampleLat,
      lng: sampleLng,
      zoom: sampleZoom
    }
    expect(setCenterAndZoom(sampleLat, sampleLng, sampleZoom)).toEqual(expectedAction)
  })
})
