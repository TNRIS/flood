import React from 'react'
import { Snackbar } from 'react-mdl'


class Toaster extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Snackbar 
        active={this.props.isSnackbarActive} 
        timeout={this.props.timeout} 
        onTimeout={this.props.hideSnackbar}>
          {this.props.snackbarText}
        </Snackbar>
      </div>
    )
  }
}

export default Toaster
