// src/components/Credits.js

import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import '../App';
import App from '../App';
import AccountBalance from './AccountBalance';
import { v4 as uuidv4 } from 'uuid';

class ApiDataComponent extends Component {
  constructor(props) {  // Store received data in state's "users" object
    super(props);
    // console.log('props obj', props)
    this.state = {  // Initialize state with an empty users array
      items: [],
      creditAmount: '',
      redirect: false,

      newCredit: { 
        id:'',
        amount:'',
        summary:'',
        date:'',
      }
    }
  }

  handleDescriptionChange = (event) => {
    this.setState({ 
      summary: event.target.value,
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
    this.props.updateBalance(this.state.creditAmount)
    // console.log(this.state.summary)
    // console.log(this.state.amount)
    this.state.newCredit.id = uuidv4()
    this.state.newCredit.amount = this.state.amount
    this.state.newCredit.summary = this.state.summary
    this.state.newCredit.date = new Date().getFullYear() + '-' + (new Date().getMonth() +1)+ '-' + new Date().getDate()
    this.state.items.push(this.state.newCredit)
    console.log(this.state.items)

  }
    
    // Make async API call to retrieve data from remote website
    async componentDidMount() {
      let linkToAPI = 'https://moj-api.herokuapp.com/credits';  // Link to remote website API
  
      // Await for promise (completion) returned from API call
      try {  // Accept success response as array of JSON objects (users)
        let response = await axios.get(linkToAPI);
        // console.log(response);  // Print out response
        // To get data object in the response, need to use "response.data"
        this.setState({items: response.data});  // Store received data in state's "users" object
      } 
      catch (error) {  // Print out errors at console when there is an error response
        if (error.response) {
          // The request was made, and the server responded with error message and status code.
          console.log(error.response.data);  // Print out error message (e.g., Not Found)
          console.log(error.response.status);  // Print out error status code (e.g., 404)
        }    
      }
    }  
  
    render() {  // Parse each element in the user JSON array returned from API call
      if (this.state.redirect) {  // Redirect to "User Profile" page when "Log In" button is clicked
          return (<Redirect to="/"/>)
        }

      return (
        <div className="container">
          {
            this.state.items.map((item) => {  // Extract "id", "name", and "email" properties of each user JSON array element
              return (
                        <div key={item.id}>
                            <li>${item.amount} {item.description} {item.date}</li>
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
        </div>
        
        
      )
      

      
    }
  
  }


  export default ApiDataComponent;


