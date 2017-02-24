import React, { PropTypes } from 'react'
import { ListItem, ListItemContent, ListItemAction, Switch } from 'react-mdl'


class Subscription extends React.Component {

  static propTypes = {
    gage: PropTypes.string.isRequired,
    email: PropTypes.bool.isRequired,
    sms: PropTypes.bool.isRequired
  }

  constructor() {
    super()
  }
  render() {
    return (
      <ListItem>
        <ListItemContent>{gage}</ListItemContent>
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
