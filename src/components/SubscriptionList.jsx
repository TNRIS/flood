import React, { PropTypes } from 'react'
import { List, ListItem, ListItemContent, ListItemAction, Switch } from 'react-mdl'


class SubscriptionList extends React.Component {

  constructor(subscriptionData) {
    super()
  }

  toggleSubscription(event, lid, protocol) {
    if (event.target.checked) {
      this.props.markSubscriptionForAdd(lid, protocol)
    }
    else if (!event.target.checked) {
      this.props.markSubscriptionForRemove(lid, protocol)
    }
  }

  render() {
    return (
      <List>
      {Object.keys(this.props.subscriptions).map(subscription =>
        <ListItem key={subscription}>
          <ListItemContent>{this.props.subscriptions[subscription].lid}</ListItemContent>
          <ListItemAction info="Email">
            <Switch ripple
            defaultChecked={this.props.subscriptions[subscription].email.subscribed} 
            onClick={(event) => this.toggleSubscription(event, this.props.subscriptions[subscription].lid, "email")} />
          </ListItemAction>
          <ListItemAction info="SMS">
            <Switch ripple
            defaultChecked={this.props.subscriptions[subscription].sms.subscribed}  
            onClick={(event) => this.toggleSubscription(event, this.props.subscriptions[subscription].lid, "sms")} />
          </ListItemAction>
        </ListItem>
      )}
      </List>
    )
  }
}

export default SubscriptionList
