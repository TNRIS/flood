const initialState = {
  layers: [
    {
      'id': 'osm',
      'text': 'OpenStreetMap',
      'type': 'tile',
      'tileUrl': 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      'options': {
        'attribution': '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    },
    {
      'id': 'positron',
      'text': 'Positron',
      'type': 'tile',
      'tileUrl': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'options': {
        'attribution': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }
    },
    {
      'id': 'dark-matter',
      'text': 'Dark Matter',
      'type': 'tile',
      'tileUrl': 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      'options': {
        'attribution': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }
    },
    {
      'id': 'bing-road',
      'text': 'Bing Road',
      'type': 'bing',
      'options': {
        'type': 'Road'
      }
    },
    {
      'id': 'bing-aerial',
      'text': 'Bing Aerial',
      'type': 'bing',
      'options': {
        'type': 'Aerial'
      }
    }
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
