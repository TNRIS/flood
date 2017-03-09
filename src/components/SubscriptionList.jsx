import React from 'react'
import { Button, IconButton, FABButton, Badge, Icon, List, ListItem, ListItemContent, ListItemAction, Spinner, Switch, Tooltip } from 'react-mdl'


class SubscriptionList extends React.Component {
  static propTypes = {
    clearSubscriptionList: React.PropTypes.func,
    markSubscriptionForAdd: React.PropTypes.func,
    markSubscriptionForRemove: React.PropTypes.func,
    saveSubscriptionChanges: React.PropTypes.func,
    subscriptions: React.PropTypes.object,
  }
  
  constructor() {
    super()
  }

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
    this.props.saveSubscriptionChanges()
  }
  
  tooltipMessage(userInfoType) {
    if (userInfoType == "email" && this.props.email.length < 1) {
      return "Please enter your email and search again"
    } 
    else if (userInfoType="phone" && this.props.phone.length < 1) {
      return "Please enter your phone number and search again"
    }
    else {
      return "Changes will not be made until you click SAVE CHANGES"
    }
  }
  
  zoomToGage(event, gageInfo) {
    console.log(gageInfo)
    this.props.setCenterAndZoom(gageInfo.latitude, gageInfo.longitude, 12)
  }

  render() {
    let emailToggle = null
    let smsToggle = null
    
    let listContentDiv
    
    emailToggle = (gageSubscriptionId) => {
      if (this.props.gageSubscriptionById[gageSubscriptionId].hasOwnProperty("email") &&
       this.props.subscriptions.subscriptionsById[this.props.gageSubscriptionById[gageSubscriptionId].email].subscription.SubscriptionArn === "PendingConfirmation") {
        const currentSubscription = this.props.subscriptions.subscriptionsById[this.props.gageSubscriptionById[gageSubscriptionId].email]
        return (
          <Tooltip label="Pending Confirmation">
            <ListItemAction info="Email" style={{marginBottom: "0px",marginTop: "6px", marginRight: "1px"}}>
              <Icon name="email" style={{color: "#9BA4D5", marginTop: "3px", paddingRight: "3px"}}/>
            </ListItemAction>
          </Tooltip>
        )
      } else {
        return (
            <Tooltip label={this.tooltipMessage("email")}>
              <ListItemAction info="Email">
                <Switch ripple
                disabled={this.props.email.length < 1}
                defaultChecked={this.props.gageSubscriptionById[gageSubscriptionId].hasOwnProperty("email")}
                onClick={(event) => this.toggleSubscription(event, gageSubscriptionId, "email")}/>
              </ListItemAction>
            </Tooltip>
          )
        }
      }
    
    smsToggle = (gageSubscriptionId) => {
      return (
        <Tooltip label={this.tooltipMessage("phone")}>
          <ListItemAction info="SMS">
            <Switch ripple
            disabled={this.props.phone.length < 1}
            defaultChecked={this.props.gageSubscriptionById[gageSubscriptionId].hasOwnProperty("sms")}
            onClick={(event) => this.toggleSubscription(event, gageSubscriptionId, "sms")} />
          </ListItemAction>
        </Tooltip>
      )
    }
    
    if (this.props.isUpdating) {
      console.log("show spinner")
      listContentDiv = <Spinner />
    }
    else {
      listContentDiv = (
        <div>
          <Badge text={this.props.allSubscriptions.length}>Total Subscriptions</Badge>
          <List>
            {this.props.allGageSubscriptions.map(gageSubscriptionId =>
              <ListItem twoLine key={gageSubscriptionId} className="subscription-list-item">
                <ListItemAction className="subscription-list-item__locateAction">
                  <FABButton colored mini ripple
                  onClick={(event) => this.zoomToGage(event, this.props.gageInfo[this.props.gageSubscriptionById[gageSubscriptionId].lid])}>
                    <Icon name="room"/>
                  </FABButton>
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
          <Button primary ripple type="button" value="Cancel"
            onClick={this.props.saveSubscriptionChanges}>SAVE CHANGES</Button>
          <Button primary ripple
            onClick={this.props.clearSubscriptionList}>CLEAR</Button>
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
