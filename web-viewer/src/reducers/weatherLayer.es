const initialState = {
  active: 'radar'
}

export default function weatherLayer(state = initialState, action) {
  switch (action.type) {
    case 'SET_WEATHER_LAYER':
      return Object.assign({}, state, {active: action.id})
    default:
      return state
  }
}