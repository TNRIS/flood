import React, { PropTypes } from 'react'
import { List, ListItem, ListItemContent, ListItemAction, Switch } from 'react-mdl'


class SubscriptionList extends React.Component {

  constructor(subscriptionData) {
    super()
    this.state = {}
  }

  render() {
    return (
      <List>
      {Object.keys(this.props.subscriptions).map(subscription =>
        <ListItem key={this.props.subscriptions[subscription].gage}>
          <ListItemContent>{this.props.subscriptions[subscription].gage}</ListItemContent>
          <ListItemAction info="Email">
            <Switch defaultChecked={this.props.subscriptions[subscription].email.subscribed} />
          </ListItemAction>
          <ListItemAction info="SMS">
            <Switch defaultChecked={this.props.subscriptions[subscription].sms.subscribed}  />
          </ListItemAction>
        </ListItem>
      )}
      </List>
    )
  }
}

export default SubscriptionList
