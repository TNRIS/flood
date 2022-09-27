import React, { Component } from 'react'

import PopupTitleContainer from '../containers/PopupTitleContainer'
import PopupContent from './PopupContent'

import { store } from '../store'
import {Provider} from 'react-redux'

import icon from '../images/custom_button.png'

const colStyle = {
  "border": "1px solid #ddd",
  "padding": "8px"
}

const cell = {
  padding: "5px"
}

const boldCell = {
  padding: "5px",
  "fontWeight": "bold"
}

export default class CustomLayerPopup extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <PopupTitleContainer icon={icon} title="Custom Layer" leafletMap={this.props.leafletMap}/>
        </Provider>
        <PopupContent>
          <Provider store={store}>
            <table>
              {
                Object.entries(this.props.customData).map((value, index) => {
                  return <tr style={Object.assign(colStyle)}><td style={boldCell}>{value[0]}</td><td style={cell}>{value[1]}</td></tr>
                })
              }
            </table>           
          </Provider>
        </PopupContent>
      </div>
    )
  }
}