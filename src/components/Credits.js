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
    this.state = {  // Initialize state with an empty users array and creditAmount
      items: [],
      creditAmount: '',
      redirect: false,

      newCredit: {  // object for new credits 
        amount:'',
        description:'',
      }
    }
  }

  // handle event when text entered in description field 
  handleDescriptionChange = (event) => {
    this.setState({ 
      description: event.target.value,
    })
    
  }

  // handle event when amount entered in amount field 
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

  // add to newCredits object 
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

  // add to credits array 
  this.props.credits.push(this.state.newCredit)

  }
  
    render() {  // 
      if (this.state.redirect) {  // Redirect to "Home" page when  redirect is true 
          return (<Redirect to="/"/>)
        }

      return (
        <div className="container">
          <h1>Credits</h1>
          {
           this.props.credits.map((credit) => {  // Extract "id", "amount", "description", and date properties of each item JSON array element
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