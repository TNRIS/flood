import React, { PropTypes } from 'react'
import { ListItem, ListItemContent, ListItemAction, Switch } from 'react-mdl'


class Subscription extends React.Component {

  static propTypes = {
    email: PropTypes.object,
    gage: PropTypes.string,
    sms: PropTypes.object
  }

  constructor(subscriptionData) {
    super()
    this.gage = subscriptionData.gage
  }

  render() {
    return (
      <ListItem>
        <ListItemContent>{this.gage}</ListItemContent>
        <ListItemAction info="Email">
          <Switch/>
        </ListItemAction>
        <ListItemAction info="SMS">
          <Switch/>
        </ListItemAction>
      </ListItem>
    )
  }
}

export default Subscription
