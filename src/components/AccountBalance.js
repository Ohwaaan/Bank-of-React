// src/components/AccountBalance.js

import React, {Component} from 'react';

class AccountBalance extends Component {

  refresh = () => {
    // re-renders the component
    this.setState({});
  };
  render() {
    return (

      <div>
        Balance: {this.props.accountBalance}
      </div>
      
    );
  }
}

export default AccountBalance;