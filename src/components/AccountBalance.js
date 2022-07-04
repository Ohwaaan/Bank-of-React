// src/components/AccountBalance.js

import React, {Component} from 'react';

class AccountBalance extends Component {

  refresh = () => {
    // re-renders the component
    this.setState({});
  };
  render() {
    return (
      <div onChange={this.refresh}>
        Balance: {this.props.accountBalance.toFixed(2)}

      </div>
      
    );
  }
}

export default AccountBalance;