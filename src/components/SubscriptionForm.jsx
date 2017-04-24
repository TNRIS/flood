import React, { Component, PropTypes } from 'react'
import { Button, Spinner, Textfield } from 'react-mdl'

import SubscriptionListContainer from '../containers/SubscriptionListContainer'

/** Form for entering user info and updating current subscriptions */
class SubscriptionForm extends Component {
  static propTypes = {
    allSubscriptions: PropTypes.array,
    clearSubscriptionList: PropTypes.func,
    currentSubscriptions: PropTypes.object,
    email: PropTypes.string,
    phone: PropTypes.string,
    getUserSubscriptions: PropTypes.func,
    isFetching: PropTypes.bool,
    isUpdating: PropTypes.bool,
    setUserInfo: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount() {
    this.setState({
      email: this.props.email,
      phone: this.props.phone
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        error: nextProps.error,
        isFetching: nextProps.isFetching,
        nextToken: nextProps.nextToken
      })
    }
  }

  /**
   * Watches for changes on the html inputs
   * @param {object} event - event fired when the SEARCH button is clicked
   */
  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const nextState = {}
    nextState[name] = value
    this.setState(nextState)
  }

  /**
   * Sets the user info in the store and searches for the user's subscriptions
   * @param {object} event - event fired when the SEARCH button is clicked
   */
  handleSearch(event) {
    event.preventDefault()
    this.props.setUserInfo(this.state.email, this.state.phone)
    this.props.getUserSubscriptions(this.state.email, this.state.phone, this.state.nextToken)
  }

  render() {
    let subscriptionManagerContent
    let searchButtonDisabled

    searchButtonDisabled = (this.state.email.length === 0 && this.state.phone.length === 0)

    // Checks to see if there are any subscriptions to display in the store or if the form is still fetching
    if (this.props.allSubscriptions.length > 0 && !this.props.isFetching && !this.props.isUpdating) {
      subscriptionManagerContent = (<SubscriptionListContainer/>)
    }
    else if (this.props.isFetching || this.props.isUpdating) {
      subscriptionManagerContent = (
        <Spinner style={{display: 'block', margin: 'auto',  marginBottom: "40px", marginTop: "40px"}}/>
      )
    }
    else {
      subscriptionManagerContent = (
        <form onSubmit={ this.handleSearch } style={{marginRight: "10px", marginLeft: "10px"}}>
            <p>Click on a flood gage and subscribe to receive alerts.</p>
            <p>Enter your phone number or email to manage your current subscriptions.</p>
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
            <Button ripple disabled={searchButtonDisabled}
            className="flood-form-button"
            type="submit"
            value="Submit"
            style={{marginRight: "10px"}}>SEARCH</Button>
        </form>
      )
    }
    return (
        <div ref="subscriptionManager"
        style={{paddingTop: '20px', paddingBottom: '20px', paddingLeft: '0', paddingRight: '0'}}>
          {subscriptionManagerContent}
        </div>
    )
  }
}

export default SubscriptionForm
