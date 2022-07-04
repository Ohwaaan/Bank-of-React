// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import ApiDataComponent from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor(props) {  // Create and initialize state
    super(props); 
    this.state = {
      accountBalance: 100000.59,
      credits: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
      
    }
  }

      // Make async API call to retrieve data from remote website
      async componentDidMount() {
        let linkToAPI = 'https://moj-api.herokuapp.com/credits';  // Link to remote website API
    
        // Await for promise (completion) returned from API call
        try {  // Accept success response as array of JSON objects (users)
          let response = await axios.get(linkToAPI);
          // console.log(response);  // Print out response
          // To get data object in the response, need to use "response.data"
          this.setState({credits: response.data});  // Store received data in state's "users" object
        } 
        catch (error) {  // Print out errors at console when there is an error response
          if (error.response) {
            // The request was made, and the server responded with error message and status code.
            console.log(error.response.data);  // Print out error message (e.g., Not Found)
            console.log(error.response.status);  // Print out error status code (e.g., 404)
          }    
        }
      }  

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Update accountBalance
  updateBalance = (newTotal) => { 
    let newBalance = Number(this.state.accountBalance) + Number(newTotal) 
    this.state.accountBalance = newBalance
  }


  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const CreditsComponent = () => ( 
    <ApiDataComponent 
      updateBalance={this.updateBalance} 
      credits={this.state.credits} 
      accountBalance={this.state.accountBalance} />)   

    const DebitsComonent = () => (
      <Debits 
      updateBalance = {this.updateBalance}
      />
    )

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}/> 
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComonent}/>
        </div>
      </Router>
    );
  }
}

export default App;