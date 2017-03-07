import React from 'react'
import { Button, Badge, List, ListItem, ListItemContent, ListItemAction, Switch, Tooltip } from 'react-mdl'


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
    else if (userInfoType="phone" && this.props.phone < 1) {
      return "Please enter your phone number and search again"
    }
    return "Changes will not be made until you click SAVE CHANGES"
  }

  render() {
    console.log(this.props);
    let emailToggle = null
    let smsToggle = null

    
    return (
      <div>
      <Badge text={this.props.allGageSubscriptions.length}>Total Subscriptions</Badge>
        <List>
          {this.props.allGageSubscriptions.map(gageSubscriptionId =>
            <ListItem key={gageSubscriptionId} className="subscription-list-item">
              <ListItemContent>{this.props.gageSubscriptionById[gageSubscriptionId].lid}</ListItemContent>
              <Tooltip label={this.tooltipMessage("email")}>
                <ListItemAction info="Email">
                  <Switch ripple
                  disabled={this.props.email.length < 1}
                  defaultChecked={this.props.gageSubscriptionById[gageSubscriptionId].hasOwnProperty("email")}
                  onClick={(event) =>
                    this.toggleSubscription(event, gageSubscriptionId, "email")} />
                </ListItemAction>
              </Tooltip>
              <Tooltip label={this.tooltipMessage("phone")}>
              <ListItemAction info="SMS">
                <Switch ripple
                disabled={this.props.phone.length < 1}
                defaultChecked={this.props.gageSubscriptionById[gageSubscriptionId].hasOwnProperty("sms")}
                onClick={(event) =>
                  this.toggleSubscription(event, gageSubscriptionId, "sms")} />
              </ListItemAction>
              </Tooltip>
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
}

export default SubscriptionList
