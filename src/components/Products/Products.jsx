import React from 'react';
import Header from '../Header';
import AddStockModal from '../Stock/AddStockModal';
import AddModal from './AddModal';
import ProductList from './ProductList';

export default class Products extends React.Component {
  render() {
    return (
      <div>
        <Header category="Productos" button1={<AddStockModal />} button2={<AddModal />} />
        <ProductList />
      </div>
    );
  }
}
