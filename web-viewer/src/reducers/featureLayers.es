const initialState = {
  layers: [
    {
      'id': 'ahps-flood',
      'text': 'Flood Gages',
      'layer': {
        'type': 'cartodb',
        'viz_json': 'https://tnris-twdb.cartodb.com/u/tnris/api/v2/viz/2b0f91b4-d67b-11e5-8a74-0ea31932ec1d/viz.json',
      },
      'active': true,
    },
    {
      'id': 'lake-conditions',
      'text': 'Reservoir Conditions',
      'layer': {
        'type': 'cartodb',
        'viz_json': 'https://tnris-twdb.cartodb.com/u/tnris/api/v2/viz/e863ba1a-c14a-11e5-b328-0e31c9be1b51/viz.json',
      },
      'active': true,
    },
  ],
}

export default function baseLayers(state = initialState, action) {
  switch (action.type) {
    case 'SET_FEATURE_LAYER':
      return Object.assign({}, state, {
        active: action.id
      })
    default:
      return state
  }
}

