import React, { Component } from 'react'
import { Textfield, Button, DataTable, TableHeader, Checkbox, Spinner } from 'react-mdl'

import SubscriptionList from './SubscriptionList'
import SubscriptionListContainer from '../containers/SubscriptionListContainer'


class SubscriptionForm extends Component {
  static propTypes = {
    clearSubscriptionList: React.PropTypes.func,
    currentSubscriptions: React.PropTypes.object,
    getUserSubscriptions: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
    setUserInfo: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        email: nextProps.email,
        phone: nextProps.phone,
        error: nextProps.error,
        isFetching: nextProps.isFetching,
        nextToken: nextProps.nextToken
      })
    }
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const nextState = {}
    nextState[name] = value
    this.setState(nextState)
  }

  handleSearch(event) {
    event.preventDefault()
    console.log(this.state)
    this.props.setUserInfo(this.state.email, this.state.phone)
    this.props.getUserSubscriptions(this.state.email, this.state.phone, this.state.nextToken)
  }

  render() {
    
    let subscriptionManagerContent
    
    if (this.props.allSubscriptions.length > 0 && !this.props.isFetching) {
      subscriptionManagerContent = (<SubscriptionListContainer/>)
    }
    else {
      subscriptionManagerContent = (
        <form onSubmit={ this.handleSearch }>
            <p>Enter your phone number and email to manage your current subscriptions.</p>
            <Textfield floatingLabel
                       onChange={ this.handleChange }
                       label="Email..."
                       type="email"
                       id="email"
                       name="email"
                       value= { this.state.email }/>
            <Textfield floatingLabel
                       onChange={ this.handleChange }
                       pattern="[0-9]*"
                       minLength={10}
                       maxLength={10}
                       error="10 digits only including US area code"
                       label="Phone..."
                       type="tel"
                       id="phone"
                       name="phone"
                       value= { this.state.phone }/>
            <Button primary ripple type="submit" value="Submit">SEARCH</Button>
            <Button primary ripple type="button" value="Cancel" onClick="">CANCEL</Button>
        </form>
      )
    }
    return (
        <div ref="subscriptionManager" style={{paddingTop: '20px', paddingLeft: '10px', paddingRight: '10px'}}>
          {subscriptionManagerContent}
        </div>
    )
  }
}

export default SubscriptionForm
