/* eslint-disable no-console */
import React from 'react';
import Header from '../Header';
import ProductList from '../Products/ProductList';
import SaleList from '../Sale/SalesList';
import API from '../../service/api';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [],
    };
  }

  componentDidMount() {
    if (this.props.location.state.previousPath === '/product') {
      API.get(`/search/product/${this.props.location.state.searchInput}`)
        .then((res) => this.setState({ resultList: res }))
        .catch((e) => console.log(e));
    } else {
      API.get(`/search/sale/${this.props.location.state.searchInput}`)
        .then((res) => this.setState({ resultList: res }))
        .catch((e) => console.log(e));
    }
  }

  componentDidUpdate() {
    if (this.props.location.state.previousPath === '/product') {
      API.get(`/search/product/${this.props.location.state.searchInput}`)
        .then((res) => this.setState({ resultList: res }))
        .catch((e) => console.log(e));
    } else {
      API.get(`/search/sale/${this.props.location.state.searchInput}`)
        .then((res) => this.setState({ resultList: res }))
        .catch((e) => console.log(e));
    }
  }

  renderResult() {
    if (this.props.location.state.isProductsPath) {
      return (
        <ProductList
          products={this.state.resultList}
          message="No encontramos nada!"
        />
      );
    }
    return (
      <SaleList
        sales={this.state.resultList}
        message="No encontramos nada!"
      />
    );
  }

  render() {
    return (
      <div>
        <Header category={`Resultado de ${this.props.location.state.searchInput}`} />
        {this.renderResult()}
      </div>
    );
  }
}
