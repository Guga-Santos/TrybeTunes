import React, { Component } from 'react';
import Header from '../components/Header';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Header />
        <p>NotFound</p>
      </div>
    );
  }
}

export default NotFound;
