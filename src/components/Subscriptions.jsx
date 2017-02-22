import React, { Component } from 'react'
import { Textfield, Button, DataTable, TableHeader, Checkbox, Spinner } from 'react-mdl'


class Subscriptions extends Component {
  static propTypes = {
    getUserSubscriptions: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
    currentSubscriptions: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        email: nextProps.email,
        phone: nextProps.phone,
        currentSubscriptions: nextProps.currentSubscriptions,
        error: nextProps.error,
        isFetching: nextProps.isFetching
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

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.email || this.state.phone) {
      this.props.getUserSubscriptions(this.state.email, this.state.phone)
    }
  }

  render() {
    let subscriptionsList = null
    if (this.props.isFetching) {
      subscriptionsList = <Spinner />
    }
    else {
      console.log(this.props.currentSubscriptions);
      if (this.props.currentSubscriptions) {
        subscriptionsList = (<div>
          <DataTable
              sortable
              shadow={0}
              rowKeyColumn="gage"
              rows={Object.keys(this.props.currentSubscriptions).map((topic) => {
                console.log(topic)
                const gagePattern = new RegExp("^\S\S\S\S\n$")
                if (topic) {
                  let emailCheckbox = <Checkbox/>
                  let phoneCheckbox = <Checkbox/>
                  if (this.props.currentSubscriptions[topic].email) {
                    emailCheckbox = this.props.currentSubscriptions[topic].email.Protocol === "email" ? <Checkbox defaultChecked/> : <Checkbox/>
                  } 

                  
                  if (this.props.currentSubscriptions[topic].phone) {
                    phoneCheckbox = this.props.currentSubscriptions[topic].phone.Protocol === "sms" ? <Checkbox defaultChecked/> : <Checkbox/>
                  }

                  return {gage: this.props.currentSubscriptions[topic].gage, email: emailCheckbox, phone: phoneCheckbox}
                }
              })}
              style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}>
              <TableHeader name="gage">Gage</TableHeader>
              <TableHeader name="email">Email</TableHeader>
              <TableHeader name="phone" >Phone</TableHeader>
          </DataTable>
          <Button primary ripple onClick="">Save Changes</Button>
        </div>)
      }
    }
    return (
        <div ref="subscriptionManager" style={{padding: '10px'}}>
          <form onSubmit={ this.handleSubmit }>
              <p>Enter your phone number and email to manage your current subscriptions.</p>
              <Textfield floatingLabel
                         onChange= { this.handleChange }
                         label="Email..."
                         type="email"
                         id="email"
                         name="email"
                         value= { this.state.email }/>
              <Textfield floatingLabel
                         onChange= { this.handleChange }
                         pattern="[0-9]*"
                         minLength={10}
                         maxLength={10}
                         error="10 digits only including US area code"
                         label="Phone..."
                         type="tel"
                         id="phone"
                         name="phone"
                         value= { this.state.phoneNumber }/>
              <Button primary ripple type="submit" value="Submit">SEARCH</Button>
              <Button primary ripple type="button" value="Cancel" onClick="">CANCEL</Button>
          </form>
          {subscriptionsList}
        </div>
    )
  }
}

export default Subscriptions
