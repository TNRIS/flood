export const setBaseLayer = (id) => {
  return {
    type: 'SET_BASELAYER',
    id
  }
}

export const setFeatureLayer = (id) => {
  return {
    type: 'SET_FEATURE_LAYER',
    id
  }
}

export const setWeatherLayer = (id) => {
  return {
    type: 'SET_WEATHER_LAYER',
    id
  }
}
