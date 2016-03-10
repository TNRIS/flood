const initialState = {
  layers: [
    {
      'id': 'osm',
      'text': 'OpenStreetMap',
    },
    {
      'id': 'bing',
      'text': 'Bing',
    },
  ],
  active: 'osm'
}

export default function layers(state = initialState, action) {
  switch (action.type) {
    case 'SET_LAYER':
      return Object.assign({}, state, {
        active: action.id
      })
    default:
      return state
  }
}
