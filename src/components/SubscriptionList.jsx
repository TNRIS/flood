import React from 'react'
import { Button, List, ListItem, ListItemContent, ListItemAction, Switch } from 'react-mdl'


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

  toggleSubscription(event, lid, protocol) {
    if (event.target.checked) {
      this.props.markSubscriptionForAdd(lid, protocol)
    }
    else if (!event.target.checked) {
      this.props.markSubscriptionForRemove(lid, protocol)
    }
  }

  saveChanges() {
    this.props.saveSubscriptionChanges()
  }

  render() {
    let listActions = null

    if (Object.keys(this.props.subscriptions).length === 0 && this.props.subscriptions.constructor === Object) {
      listActions = null
    }
    else {
      listActions = (
        <div>
          <Button primary ripple
          type="button"
          value="Cancel"
          onClick={this.props.saveSubscriptionChanges}>SAVE CHANGES</Button>
          <Button primary ripple
          onClick={this.props.clearSubscriptionList}>CLEAR</Button>
        </div>
      )
    }
    return (
      <div>
        <List>
        {Object.keys(this.props.subscriptions).map(subscription =>
          <ListItem key={subscription} className="subscription-list-item">
            <ListItemContent>{this.props.subscriptions[subscription].lid}</ListItemContent>
            <ListItemAction info="Email">
              <Switch ripple
              defaultChecked={this.props.subscriptions[subscription].email.subscribed}
              onClick={(event) =>
                this.toggleSubscription(event, this.props.subscriptions[subscription].lid, "email")} />
            </ListItemAction>
            <ListItemAction info="SMS">
              <Switch ripple
              defaultChecked={this.props.subscriptions[subscription].sms.subscribed}
              onClick={(event) =>
                this.toggleSubscription(event, this.props.subscriptions[subscription].lid, "sms")} />
            </ListItemAction>
          </ListItem>
        )}
        </List>
        {listActions}
      </div>
    )
  }
}

export default SubscriptionList
