import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FABButton,
  Badge,
  Checkbox,
  Icon,
  IconButton,
  IconToggle,
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
  Spinner,
  Switch,
  Tooltip
} from 'react-mdl'


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
    subscriptions: React.PropTypes.object,
    unqueueChangeFromChangeList: React.PropTypes.func
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

  saveChanges() {
    this.handleCloseConfirmDialog()
    this.props.saveSubscriptionChanges()
  }

  /**
   * Returns a tooltip message based on the content/control for the given subscription and thee given user info
   */
  tooltipMessage(userInfoType) {
    if (userInfoType === "email" && this.props.email.length < 1) {
      return "Please enter your email and search again"
    }
    else if (userInfoType === "phone" && this.props.phone.length < 1) {
      return "Please enter your phone number and search again"
    }
    return "Changes will not be made until you click SAVE CHANGES"
  }

  /**
   * Method to set the map center and zoom to a gage location
   */
  zoomToGage(event, gageInfo) {
    console.log(gageInfo)
    this.props.setCenterAndZoom(gageInfo.latitude, gageInfo.longitude, 12)
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

  render() {
    let emailToggle = null
    let listContentDiv
    let smsToggle = null

    /**
     * Creates the email toggle content based on user info and subscription status
     * @param  {string} gageSubscriptionId - id of the gageSubscription record
     * @return {Component}                   email subscription list action
     */
    emailToggle = (gageSubscriptionId) => {
      if (
        this.props.gageSubscriptionById[gageSubscriptionId].hasOwnProperty("email") &&
        this.props.subscriptions.subscriptionsById[this.props.gageSubscriptionById[gageSubscriptionId].email]
        .subscription.SubscriptionArn === "PendingConfirmation") {
        return (
          <ListItemAction
            info="Email" title="Pending Confirmation"
            style={{marginBottom: "0px", marginTop: "7px", marginRight: "0", marginLeft: "4px"}}>
            <Icon name="email" style={{color: "#999999"}}/>
          </ListItemAction>
        )
      }
      return (
          <ListItemAction info="Email" title={this.tooltipMessage("email")}>
            <Checkbox ripple
            name="email"
            disabled={this.props.email.length < 1}
            defaultChecked={this.props.gageSubscriptionById[gageSubscriptionId].hasOwnProperty("email")}
            onClick={(event) => this.toggleSubscription(event, gageSubscriptionId, "email")}/>
          </ListItemAction>
        )
    }

    /**
     * Creates the sms toggle content based on user info and subscription status
     * @param  {string} gageSubscriptionId - id of the gageSubscription record
     * @return {Component}                   SMS subscription list action
     */
    smsToggle = (gageSubscriptionId) => {
      return (
        <ListItemAction info="SMS" title={this.tooltipMessage("phone")}>
          <Checkbox ripple
          name="textsms"
          disabled={this.props.phone.length < 1}
          defaultChecked={this.props.gageSubscriptionById[gageSubscriptionId].hasOwnProperty("sms")}
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

    const confirmDialog = () => {
      return (
        <div>
          <Dialog className="confirm-subscription-change"
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
        </div>
      )
    }

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
                  <IconButton mini name="room" title="Zoom to gage location"
                  onClick={(event) => {
                    this.zoomToGage(
                      event,
                      this.props.gageInfo[this.props.gageSubscriptionById[gageSubscriptionId].lid]
                    )}
                  }/>
                </ListItemAction>
                <ListItemContent
                subtitle={this.props.gageInfo[this.props.gageSubscriptionById[gageSubscriptionId].lid].name}>
                  {this.props.gageSubscriptionById[gageSubscriptionId].lid}
                </ListItemContent>
                {emailToggle(gageSubscriptionId)}
                {smsToggle(gageSubscriptionId)}
              </ListItem>
            )}
          </List>
          <Button ripple
            className="flood-form-button"
            style={{marginLeft: "10px"}}
            onClick={this.props.clearSubscriptionList}>BACK</Button>
            {saveButton()}
            {confirmDialog()}
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
