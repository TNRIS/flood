import React, { Component, Fragment } from 'react'

import PopupTitleContainer from '../containers/PopupTitleContainer'
import PopupContent from './PopupContent'

import { store } from '../store'
import {Provider} from 'react-redux'

import icon from '../images/tree.png'
import 'regenerator-runtime/runtime'

export default class LakeConditionsPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parkQuery: null
    }
  }

  async componentDidMount() {
    try {

      // Search for information about the park and grab the first result.
      let splitParkName = this.props.parkName.split('-')[0]
      let quicksearch = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(splitParkName) + '+incategory:State_parks_of_Texas|Mountain_ranges_of_Texas|Rivers_of_Texas|Reservoirs_in_Texas|Rock_formations_of_Texas|National_Forests_of_Texas'}&utf8=&format=json&origin=*`)
      let result = await quicksearch.json()
  
      if(result.query.search.length) {
        let page = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${result.query.search[0].pageid}&origin=*`)
        let summary = await page.json()
        this.setState({
          parkQuery: JSON.stringify(summary.query.pages[result.query.search[0].pageid].extract)
        })
      }
      else {
        // set parkQuery to empty string if there are no results.
        this.setState({
          parkQuery: ""
        })
      }

    } catch(err) {
      console.error(`Error loading park summary: ${err.message || err}`)
    }

  }


  render() {
    const labelStyle = {
      "fontSize": "24px",
      "textAlign": "center"
    }

    const blurbStyle = {
      "padding": "12px"
    }

    return (
      <Fragment>
        <div>
            <Provider store={store}>
              <PopupTitleContainer icon={icon} title={this.props.title} leafletMap={this.props.leafletMap}/>
              <PopupContent>
                    <p style={labelStyle}>{this.props.parkName}</p>
                    <p style={blurbStyle}>{this.state.parkQuery}</p>
              </PopupContent>
            </Provider>
        </div>
      </Fragment>
    )
  }
}
