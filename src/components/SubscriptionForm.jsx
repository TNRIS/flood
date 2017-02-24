import React, { Component } from 'react'
import { Textfield, Button, DataTable, TableHeader, Checkbox, Spinner } from 'react-mdl'

import SubscriptionList from './SubscriptionList'
import SubscriptionListContainer from '../containers/SubscriptionListContainer'


class SubscriptionForm extends Component {
  static propTypes = {
    getUserSubscriptions: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
    currentSubscriptions: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSaveChanges = this.handleSaveChanges.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        email: nextProps.email,
        phone: nextProps.phone,
        currentSubscriptions: nextProps.currentSubscriptions,
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
    this.props.clearSubscriptions()
    this.props.getUserSubscriptions(this.state.email, this.state.phone, this.state.nextToken)
  }
  
  handleSaveChanges(event){
    console.log("Saving subscription updates");
    this.props.saveSubscriptionUpdates()
  }
  
  handleSmsSubscriptionChange(event) {
    if (event.target.checked) {
      console.log("Adding SMS");
      this.props.addSmsSubscription(topic)
    }
    else {
      console.log("Removing SMS");
      this.props.removeSmsSubscription(topic)
    }
  }

  render() {
    let subscriptionsList = null
    if (this.props.isFetching) {
      subscriptionsList = <Spinner />
    }
    else if (Object.keys(this.props.currentSubscriptions).length > 0) {
      subscriptionsList = (
        <div>
          <DataTable
            sortable
            shadow={0}
            rowKeyColumn="gage"
            rows={Object.keys(this.props.currentSubscriptions).map((topic) => {
              const gagePattern = new RegExp("^\S\S\S\S\n$")
              if (topic) {
                let emailCheckbox = <Checkbox onChange={ this.handleEmailSubscriptionChange }/>
                let phoneCheckbox = <Checkbox onChange={ this.handleSmsSubscriptionChange }/>
                if (this.props.currentSubscriptions[topic].email) {
                  emailCheckbox = this.props.currentSubscriptions[topic].email.Protocol === "email" ? <Checkbox defaultChecked /> : <Checkbox />
                } 

                if (this.props.currentSubscriptions[topic].phone) {
                  phoneCheckbox = this.props.currentSubscriptions[topic].phone.Protocol === "sms" ? <Checkbox defaultChecked /> : <Checkbox />
                }

                return {gage: this.props.currentSubscriptions[topic].gage, email: emailCheckbox, phone: phoneCheckbox}
              }
            })}
            style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}>
            <TableHeader name="gage">Gage</TableHeader>
            <TableHeader name="email">Email</TableHeader>
            <TableHeader name="phone" >Phone</TableHeader>
        </DataTable>
        <Button primary ripple onClick={ this.handleSaveChanges }>Save Changes</Button>
      </div>
      )
    }
    return (
        <div ref="subscriptionManager" style={{padding: '10px'}}>
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
          <SubscriptionListContainer/>
        </div>
    )
  }
}

export default SubscriptionForm
