import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'


import Modal from 'react-modal'
import { RingLoader } from 'react-spinners'

const reactModalStyle = {
  overlay: {
    backgroundColor   : 'rgba(0, 0, 0, 0.50)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    border: null,
    borderRadius: null
  }
}


class SubscriptionList extends React.Component {
  static propTypes = {
    addSubscribeToChangeList: PropTypes.func,
    addUnsubscribeToChangeList: PropTypes.func,
    allGageSubscriptions: PropTypes.array,
    allSubscriptions: PropTypes.array,
    allSubscriptionChanges: PropTypes.array,
    clearSubscriptionList: PropTypes.func,
    email: PropTypes.string,
    gageInfo: PropTypes.object,
    isUpdating: PropTypes.bool,
    gageSubscriptionById: PropTypes.object,
    markSubscriptionForAdd: PropTypes.func,
    markSubscriptionForRemove: PropTypes.func,
    phone: PropTypes.string,
    saveSubscriptionChanges: PropTypes.func,
    setCenterAndZoom: PropTypes.func,
    setPopup: PropTypes.func,
    subscriptions: PropTypes.object,
    unqueueChangeFromChangeList: PropTypes.func,
    browser: PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      showSaveButton: false
    }
    this.handleOpenConfirmDialog = this.handleOpenConfirmDialog.bind(this)
    this.handleCloseConfirmDialog = this.handleCloseConfirmDialog.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
  }

  saveChanges() {
    this.handleCloseConfirmDialog()
    this.props.saveSubscriptionChanges()
  }

  /**
   * Returns a tooltip message based on the content/control for the given subscription and thee given user info
   */
  tooltipMessage(userInfoType) {
    // if (userInfoType === "email" && this.props.email.length < 1) {
    //   return "Please enter your email and search again"
    // }
    // else if (userInfoType === "phone" && this.props.phone.length < 1) {
    //   return "Please enter your phone number and search again"
    // }
    return "Changes will not be made until you click SAVE CHANGES"
  }

  /**
   * Method to set the map center and zoom to a gage location
   */
  zoomToGage(event, lid, gageInfo) {
    this.props.setCenterAndZoom(gageInfo.latitude, gageInfo.longitude, 10)
    this.props.setPopup({
      id: "ahps-flood",
      data: {
        lid: lid,
        wfo: gageInfo.wfo,
        name: gageInfo.name
      },
      clickLocation: L.latLng(gageInfo.latitude, gageInfo.longitude)
    })

    if (this.props.browser.width < 1025) {
      const layout = document.querySelector('.mdl-layout')
      layout.MaterialLayout.toggleDrawer()
    }
  }

  handleOpenConfirmDialog() {
    this.setState({
      openConfirmDialog: true
    })
  }

  handleCloseConfirmDialog() {
    this.setState({
      openConfirmDialog: false
    })
  }

  static setZoomButtonColor(sigstage) {
    switch (sigstage) {
      case 'major':
        return "zoom-major"
      case 'moderate':
        return "zoom-moderate"
      case 'flood':
        return "zoom-flood"
      case 'action':
        return 'zoom-action'
      case 'no flooding':
        return 'zoom-no-flooding'
      case 'not defined':
        return 'zoom-not-defined'
      case 'low':
        return 'zoom-low'
      case 'observations not current':
        return 'zoom-observations-not-current'
      case 'out of service':
        return 'zoom-out-of-service'
      default:
        return ''
    }
  }

    /**
   * Toggles the subscription and adds or removes changes to the subscription change queue
   */
  toggleSubscription(event, gsId, protocol) {
    const gs = this.props.gageSubscriptionById[gsId]

    if (event.target.checked) {
      if (!gs.hasOwnProperty(protocol)) {
        this.props.addSubscribeToChangeList(gs.lid, protocol)
      }
      else {
        this.props.unqueueChangeFromChangeList(gs.lid, protocol, "unsubscribe")
      }
    }
    else {
      if (this.props.gageSubscriptionById[gsId].hasOwnProperty(protocol)) {
        const sId = gs[protocol]
        this.props.addUnsubscribeToChangeList(gs.lid, protocol, sId)
      }
      else {
        this.props.unqueueChangeFromChangeList(gs.lid, protocol, "subscribe")
      }
    }
  }

  render() {
    let listContentDiv
    let smsToggle = null

    /**
     * Creates the sms toggle content based on user info and subscription status
     * @param  {string} gageSubscriptionId - id of the gageSubscription record
     * @return {Component}                   SMS subscription list action
     */
    smsToggle = (gageSubscriptionId) => {
      return (
        <div title={this.tooltipMessage("phone")}><small>Alert</small>
          <div className="switch tiny">
            <input className="switch-input"
              type="checkbox"
              name="textsms"
              checked="true"
              onClick={(event) => this.toggleSubscription(event, gageSubscriptionId, "sms")}
              />
            <label className="switch-paddle" for="textsms">
              <span className="show-for-sr"></span>
            </label>
          </div>
       </div>
      )
    }

    const saveButton = () => {
      let save
      if (this.props.allSubscriptionChanges.length > 0) {
        save = (
          <button type="button"
            className="button subscription-list-save-button"
            onClick={this.handleOpenConfirmDialog}>SAVE CHANGES</button>
        )
      }
      else {
        save = (
          <button type="button" disabled
            className="button subscription-list-save-button">SAVE CHANGES</button>
        )
      }
      return save
    }

    this.confirmDialog = (
        <Modal isOpen={this.state.openConfirmDialog} onRequestClose={this.handleCloseConfirmDialog} style={reactModalStyle}>
          <div className="card confirm-subscription-change" ref={(ref) => confirmDialog = ref}>
            <div className="card-divider subscribe-title">Confirm Changes</div>
            <div className="card-section">
              <p>Are you sure you want to save your subscription changes?</p>
            </div>
            <div className="card-section" style={{float: "right", width: "100%"}}>
              <button className="button" autoFocus="true" type="button" onClick={this.handleCloseConfirmDialog}>Cancel</button>
              <button className="button" type="button" onClick={this.saveChanges}>Confirm</button>
            </div>
          </div>
        </Modal>
      )

    if (this.props.isUpdating) {
      listContentDiv = <RingLoader color={'#92C553'} loading={true} />
    }
    else {
      listContentDiv = (
        <div className="subscription-list">
          <span>Total Subscriptions</span>
          <span className="badge subscriptions-count-badge">
            {this.props.allGageSubscriptions.length}
          </span>
          <p>Click the marker symbol next to a gage to zoom to its location.</p>
          <p>To unsubscribe from a gage, uncheck it in the list and save your changes.</p>
          <div>
            {this.props.allGageSubscriptions.map(gageSubscriptionId =>
              <div key={gageSubscriptionId} className="subscription-list-item">
                <div className="list-item-locateAction">
                  <button
                    title="Zoom to gage location"
                    className={
                      SubscriptionList.setZoomButtonColor(
                        this.props.gageInfo[this.props.gageSubscriptionById[gageSubscriptionId].lid].sigstage
                      )}
                    onClick={(event) => {
                      this.zoomToGage(
                        event,
                        this.props.gageSubscriptionById[gageSubscriptionId].lid,
                        this.props.gageInfo[this.props.gageSubscriptionById[gageSubscriptionId].lid]
                      )}
                    }>
                    <i className="fi-marker"></i>
                  </button>
                </div>
                <div>
                  {this.props.gageSubscriptionById[gageSubscriptionId].lid}
                  <small>{this.props.gageInfo[this.props.gageSubscriptionById[gageSubscriptionId].lid].name}</small>
                </div>
                {smsToggle(gageSubscriptionId)}
              </div>
            )}
          </div>
          {saveButton()}
            <Modal isOpen={this.state.openConfirmDialog} contentLabel="Confirm Changes Modal" style={reactModalStyle}>
              <div className="card">
                <div className="card-divider confirm-modal-title"><i className="material-icons">save</i>
                Save Changes
              </div>
                <div className="card-section confirm-modal-text">Are you sure you want to save your changes?</div>
                <div className="card-section confirm-modal-actions">
                  <button className="button" type="button" onClick={this.saveChanges}>Confirm</button>
                  <button autoFocus="true" className="button" type="button" onClick={this.handleCloseConfirmDialog}>Cancel</button>
                </div>
              </div>
            </Modal>

        </div>
      )
    }
    return (
      <div>
        {listContentDiv}
      </div>
    )
  }
}

export default SubscriptionList
