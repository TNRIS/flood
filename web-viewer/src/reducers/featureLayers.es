const initialState = {
  layers: [
    {
      'id': 'ahps-flood',
      'text': 'Flood Gages',
      'layerInfo': {
        'type': 'cartodb',
        'name': 'ahps-flood',
      },
      'active': true,
    },
    {
      'id': 'reservoir-conditions',
      'text': 'Reservoir Conditions',
      'layerInfo': {
        'type': 'cartodb',
        'name': 'wdft-reservoirs',
      },
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

