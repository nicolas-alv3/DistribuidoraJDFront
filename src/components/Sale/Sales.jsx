import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddSaleIcon from '@material-ui/icons/AddShoppingCart';
import Header from '../Products/Header';
import SalesList from './SalesList.jsx';

export default class Sales extends React.Component {
  addSaleButton() {
    return (
      <Fab color="primary" aria-label="add" onClick={() => this.props.history.push('/addSale')}>
        <AddSaleIcon />
      </Fab>
    );
  }

  render() {
    return (
      <div>
        <Header category="Ventas" button2={this.addSaleButton()} />
        <SalesList />
      </div>
    );
  }
}
