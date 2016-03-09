export default function layers(state = [], action) {
  switch (action.type) {
    case 'ADD_LAYER':
      return state.concat([ action.text ])
    default:
      return state
  }
}
