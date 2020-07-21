import React from 'react';
import Header from './Header';
import ProductList from './Products/ProductList';

export default class SearchResult extends React.Component {
  render() {
    return (
      <div>
        <Header category="Resultado de la busqueda" />
        <ProductList />
      </div>
    );
  }
}
