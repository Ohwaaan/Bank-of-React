// src/components/Credits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import '../App';
import { v4 as uuidv4 } from 'uuid';
import AccountBalance from './AccountBalance';

class ApiDataComponent extends Component {
  constructor() {  // Store received data in state's "users" object
    super();
    this.state = {  // Initialize state with an empty users array
      items: [],
      creditAmount: '',
      redirect: false,

      newCredit: { 
        amount:'',
        description:'',
      }
    }
  }

  handleDescriptionChange = (event) => {
    this.setState({ 
      description: event.target.value,
    })
    
  }

  handleChange = (event) => {
    this.setState({ 
      amount: event.target.value,
      creditAmount: event.target.value
    })
    
  }

  // When user clicks "Add Credit" button, store credit date to items array
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updateBalanceCredit(this.state.creditAmount)

    this.state.newCredit.id = uuidv4()
    this.state.newCredit.amount = this.state.amount
    this.state.newCredit.description = this.state.description
    this.state.newCredit.date = new Date().getFullYear() + '-' + (new Date().getMonth() +1)+ '-' + new Date().getDate()


  this.setState({
    amount: this.state.newCredit.amount,
    id: uuidv4(),
    description: this.state.newCredit.description,
    date: new Date().getFullYear() + '-' + (new Date().getMonth() +1)+ '-' + new Date().getDate()
  })

  this.props.credits.push(this.state.newCredit)

  }

  
    render() {  // Parse each element in the user JSON array returned from API call
      if (this.state.redirect) {  // Redirect to "User Profile" page when "Log In" button is clicked
          return (<Redirect to="/"/>)
        }

      return (
        <div className="container">
          <h1>Credits</h1>
          {
           this.props.credits.map((credit) => {  // Extract "id", "name", and "email" properties of each user JSON array element
              return (
                        <div key={credit.id}>
                            <li>${credit.amount} {credit.description} {credit.date}</li>
                            <br/>
                        </div> 
                )
              }
            )
          }
            <form onSubmit={this.handleSubmit}>
            <div>
                <label> Description</label>
                <input 
                  type="text"
                  onChange={this.handleDescriptionChange}
                />
                <label>Amount</label>
                <input 
                  type="text" 
                  onChange={this.handleChange}
                />
            <button type="submit">Add Credit</button>
            </div>
            </form>
            <Link to="/">Return to Home</Link>
            <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
      )
    }
  }
  export default ApiDataComponent;