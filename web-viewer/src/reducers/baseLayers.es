const initialState = {
  layers: [
    {
      'id': 'osm',
      'text': 'OpenStreetMap',
      'tileUrl': 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      'attribution': '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      'id': 'positron',
      'text': 'Positron',
      'tileUrl': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'attribution': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    },
    {
      'id': 'dark-matter',
      'text': 'Dark Matter',
      'tileUrl': 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      'attribution': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    },
  ],
  active: 'osm'
}

export default function baseLayers(state = initialState, action) {
  switch (action.type) {
    case 'SET_BASELAYER':
      return Object.assign({}, state, {
        active: action.id
      })
    default:
      return state
  }
}
