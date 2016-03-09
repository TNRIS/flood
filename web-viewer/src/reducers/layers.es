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
      // TODO
      return state
    default:
      return state
  }
}
