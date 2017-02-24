import React, { PropTypes } from 'react'
import { List } from 'react-mdl'

import Subscription from './Subscription'

const SubscriptionList = ({subscriptions}) => (
  <List>
    {subscriptions.map(
      (subscription) => {
        <Subscription key={subscription.id} {...subscription} />
      }
    )}
  </List>
)

SubscriptionList.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.shape({
    gage: PropTypes.string.isRequired,
    email: PropTypes.object,
    phone: PropTypes.object
  }).isRequired).isRequired
}

export default SubscriptionList
