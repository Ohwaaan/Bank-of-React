// src/components/Credits.js

import axios from 'axios';
import React, {Component} from 'react';
//import AccountBalance from './AccountBalance';


////////////////////

class ApiDataComponent extends Component {
    constructor(props){  // Store received data in state's "users" object
      super(props);
      this.state = {  // Initialize state with an empty users array
        items: []
      }
    }
  
    // Make async API call to retrieve data from remote website
    async componentDidMount() {
      let linkToAPI = 'https://moj-api.herokuapp.com/credits';  // Link to remote website API
  
      // Await for promise (completion) returned from API call
      try {  // Accept success response as array of JSON objects (users)
        let response = await axios.get(linkToAPI);
        console.log(response);  // Print out response
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
      return (
        <div className="container">
          {
            this.state.items.map( (item) => {  // Extract "id", "name", and "email" properties of each user JSON array element
                return (
                  <div key={item.id}>
                    <h3> {item.amount}: {item.description}</h3>
                    <h4> {item.date}</h4> 
                    <p>------------------------------</p>
                  </div>
                )
              }
            )
          }
        </div>
      )
    }
  }
  
  export default ApiDataComponent;

///////////////////

//{this.props.accountBalance} = used to keep track of changed account total

//Add Credit = user input for both description and amount that is put on display
// Date is based off current time the 'Add Credit' (possible to create 'new Date()' object and track current date with .getMonth()/.getDay(), etc)

//Date is YYYY/MM/DD

//Reference: 

