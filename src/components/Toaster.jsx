import React from 'react'
import { Snackbar } from 'react-mdl'

/**
 * App level toast notification component
 */
class Toaster extends React.Component {
  static propTypes = {
    hideSnackbar: React.PropTypes.func,
    isSnackbarActive: React.PropTypes.bool,
    snackbarText: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    snackbarTimeout: React.PropTypes.number
  }

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Snackbar
        active={this.props.isSnackbarActive}
        timeout={this.props.snackbarTimeout}
        onTimeout={this.props.hideSnackbar}>
          {this.props.snackbarText}
        </Snackbar>
      </div>
    )
  }
}

export default Toaster
