import React, { Component, PropTypes } from 'react'

import PopupTitleContainer from '../containers/PopupTitleContainer'
import PopupContent from './PopupContent'
import PopupHeader from './PopupHeader'
import PopupImageContainer from '../containers/PopupImageContainer'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

import { store } from '../store'
import {Provider} from 'react-redux'


const icon = require('../images/flood_gauge_icon.png')

const {
  TwitterShareButton,
} = ShareButtons;

const TwitterIcon = generateShareIcon('twitter')

export default class FloodGaugePopup extends Component {
  static propTypes = {
    lid: PropTypes.string,
    name: PropTypes.string,
    wfo: PropTypes.string,
    updatePopup: PropTypes.func,
    leafletMap: PropTypes.object,
    browser: PropTypes.object
  }

  render() {
    const { lid, name, wfo, updatePopup } = this.props
    const hydrographImage = `https://water.weather.gov/resources/hydrographs/${lid.toLowerCase()}_hg.png`
    const gaugeLink = `https://water.weather.gov/ahps2/hydrograph.php?wfo=${wfo.toLowerCase()}&gage=${lid.toLowerCase()}`
    
    const shareUrl = `https://${SITE_URL}/#/gage/${lid}`

    const currentStore = store.getState()
    let shareTitle
    if (currentStore.gageInfo && currentStore.gageInfo[lid]) {
      const gageInfo = currentStore.gageInfo[lid]
      if (["action", "flood", "moderate", "major"].indexOf(gageInfo.sigstage) !== -1) {
        shareTitle = `@TexasFloodOrg ${name} (${lid.toUpperCase()}) - Status: ${gageInfo.sigstage.toUpperCase()} at ${gageInfo.stage} feet`
      }
      else {
        shareTitle = `@TexasFloodOrg ${name} (${lid.toUpperCase()}) - Stage: ${gageInfo.stage} feet`
      }
    }
    else {
      shareTitle = `@TexasFloodOrg ${name} (${lid.toUpperCase()})`
    }

    return (
      <div className="flood-gage-popup">
        <Provider store={store}>
          <PopupTitleContainer icon={icon} title="Flood Gage" leafletMap={this.props.leafletMap}/>
        </Provider>
        <PopupContent>
          <PopupHeader>
            { name } ({ lid.toUpperCase() })
          </PopupHeader>
          <Provider store={store}>
            <PopupImageContainer src={hydrographImage} link={gaugeLink} updatePopup={updatePopup}
                                 target="flood-gage-details"/>
          </Provider>
          <div className="shareBar">
            <TwitterShareButton 
              url={shareUrl} 
              title={shareTitle}
              className="share-button" 
              hashtags={["TexasFlood"]}>
              <TwitterIcon size={26} round />
            </TwitterShareButton>
          </div>
        </PopupContent>
      </div>
    )
  }
}
