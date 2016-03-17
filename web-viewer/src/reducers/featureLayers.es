const initialState = {
  layers: [
    {
      'id': 'ahps-flood',
      'text': 'Flood Gages',
      'type': 'cartodb',
      'options': {
        'name': 'ahps-flood',
      },
      'active': true,
    },
    {
      'id': 'reservoir-conditions',
      'text': 'Reservoir Conditions',
      'type': 'cartodb',
      'options': {
        'name': 'wdft-reservoirs',
      },
      'active': false,
    },
    {
      'id': 'weather-radar',
      'text': 'Weather Radar',
      'type': 'aeris-radar',
      'active': false,
    },
  ],
}

export default function featureLayers(state = initialState, action) {
  switch (action.type) {
    case 'SET_FEATURE_LAYER':
      const updatedLayers = state.layers.map((layer) => {
        return Object.assign({}, layer, {
          active: layer.id === action.id
        })
      })
      return Object.assign({}, state, {
        layers: updatedLayers
      })
    default:
      return state
  }
}

