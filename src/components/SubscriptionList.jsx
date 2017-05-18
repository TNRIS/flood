import React from 'react'
import ReactDOM from 'react-dom'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Card,
  CardText,
  CardActions,
  CardTitle,
  Checkbox,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
  Spinner
} from 'react-mdl'

import Modal from 'react-modal'

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
    addSubscribeToChangeList: React.PropTypes.func,
    addUnsubscribeToChangeList: React.PropTypes.func,
    allGageSubscriptions: React.PropTypes.array,
    allSubscriptions: React.PropTypes.array,
    allSubscriptionChanges: React.PropTypes.array,
    clearSubscriptionList: React.PropTypes.func,
    email: React.PropTypes.string,
    gageInfo: React.PropTypes.object,
    isUpdating: React.PropTypes.bool,
    gageSubscriptionById: React.PropTypes.object,
    markSubscriptionForAdd: React.PropTypes.func,
    markSubscriptionForRemove: React.PropTypes.func,
    phone: React.PropTypes.string,
    saveSubscriptionChanges: React.PropTypes.func,
    setCenterAndZoom: React.PropTypes.func,
    setPopup: React.PropTypes.func,
    subscriptions: React.PropTypes.object,
    unqueueChangeFromChangeList: React.PropTypes.func,
    browser: React.PropTypes.object
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
        <ListItemAction info="Text" title={this.tooltipMessage("phone")}>
          <Checkbox ripple
          name="textsms"
          defaultChecked
          onClick={(event) => this.toggleSubscription(event, gageSubscriptionId, "sms")} />
       </ListItemAction>
      )
    }

    const saveButton = () => {
      let save
      if (this.props.allSubscriptionChanges.length > 0) {
        save = (
          <Button ripple
            className="flood-form-button"
            onClick={this.handleOpenConfirmDialog}>SAVE CHANGES</Button>
        )
      }
      else {
        save = (
          <Button ripple disabled
            className="flood-form-button">SAVE CHANGES</Button>
        )
      }
      return save
    }

    this.confirmDialog = (
          <Dialog className="confirm-subscription-change" ref={(ref) => confirmDialog = ref}
            open={this.state.openConfirmDialog} onCancel={this.handleCloseConfirmDialog}>
            <DialogTitle className="subscribe-title">Confirm Changes</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to save your subscription changes?</p>
            </DialogContent>
            <DialogActions fullWidth style={{float: "right", width: "100%"}}>
              <Button autoFocus="true" type="button" onClick={this.handleCloseConfirmDialog}>Cancel</Button>
              <Button type="button" onClick={this.saveChanges}>Confirm</Button>
            </DialogActions>
          </Dialog>
      )

    if (this.props.isUpdating) {
      listContentDiv = <Spinner />
    }
    else {
      listContentDiv = (
        <div>
          <Badge
          className="subscriptions-count-badge"
          text={this.props.allGageSubscriptions.length}>Total Subscriptions</Badge>
          <List>
            {this.props.allGageSubscriptions.map(gageSubscriptionId =>
              <ListItem twoLine key={gageSubscriptionId} className="subscription-list-item">
                <ListItemAction className="subscription-list-item__locateAction">
                  <IconButton
                    mini name="room"
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
                  }/>
                </ListItemAction>
                <ListItemContent
                subtitle={this.props.gageInfo[this.props.gageSubscriptionById[gageSubscriptionId].lid].name}>
                  {this.props.gageSubscriptionById[gageSubscriptionId].lid}
                </ListItemContent>
                {smsToggle(gageSubscriptionId)}
              </ListItem>
            )}
          </List>
          {saveButton()}
            <Modal isOpen={this.state.openConfirmDialog} contentLabel="Confirm Changes Modal" style={reactModalStyle}>
              <Card>
                <CardTitle className="confirm-modal-title"><i className="material-icons">save</i>
                Save Changes?
                </CardTitle>
                <CardText>Are you sure you want to save your changes?</CardText>
                <CardActions className="confirm-modal-actions">
                  <Button type="button" onClick={this.saveChanges}>Confirm</Button>
                  <Button autoFocus="true" type="button" onClick={this.handleCloseConfirmDialog}>Cancel</Button>
                </CardActions>
              </Card>
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
