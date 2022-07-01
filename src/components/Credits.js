// src/components/Credits.js

import React, {Component} from 'react';
//import AccountBalance from './AccountBalance';

class CreditsTracker extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("https://moj-api.herokuapp.com/credits")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: false
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            <h1>Credits</h1>
            {/* {items.map(item => (
              <li key={item.id}>
                {item.description} {item.date}
              </li>
            ))} */}
          </ul>
        );
      }
    }
  }

  export default CreditsTracker;

//{this.props.accountBalance} = used to keep track of changed account total

//Add Credit = user input for both description and amount that is put on display
// Date is based off current time the 'Add Credit' (possible to create 'new Date()' object and track current date with .getMonth()/.getDay(), etc)

//Date is YYYY/MM/DD

//Reference: 

