import React from 'react';
import Header from '../Products/Header';

export default class AddSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Header category="Nueva venta" />
    );
  }
}
