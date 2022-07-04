// src/components/Debits.js
import React, {Component, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import AccountBalance from './AccountBalance';
import '../App';

class Debits extends Component {
  
  constructor(props) {  // Store received data in state's "users" object
    super(props);
    this.state = {  // Initialize state with an empty users array
      items: [],
      debitAmount: '',
      redirect: false,

      newDebit: { 
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
      debitAmount: event.target.value
    })
    
  }

  // When user clicks "Add Debit" button, store debit date to items array
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updateBalanceDebit(this.state.debitAmount)

  this.state.newDebit.id = uuidv4()
  this.state.newDebit.amount = this.state.amount
  this.state.newDebit.description = this.state.description
  this.state.newDebit.date = new Date().getFullYear() + '-' + (new Date().getMonth() +1)+ '-' + new Date().getDate()

  this.setState({
    id: uuidv4(),
    amount: this.state.newDebit.amount,
    description: this.state.newDebit.description,
    date: new Date().getFullYear() + '-' + (new Date().getMonth() +1)+ '-' + new Date().getDate(),
  })

  this.props.debits.push(this.state.newDebit)



  }
  
    render() {  // Parse each element in the user JSON array returned from API call
      // if (this.state.redirect) {  // Redirect to "User Profile" page when "Log In" button is clicked
      //     return (<Redirect to="/"/>)
      //   }

      return (
        <div className="container">
          {
           this.props.debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each user JSON array element
              return (
                        <div key={debit.id}>
                            <li>${debit.amount} {debit.description} {debit.date}</li>
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
            <button type="submit">Add Debit</button>
            </div>
            </form>
            <Link to="/">Return to Home</Link>
            
        </div>
        
        
      )
      

      
    }
  
  }

export default Debits;