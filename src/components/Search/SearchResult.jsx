/* eslint-disable no-console */
import React from 'react';
import Header from '../Header';
import ProductList from '../Products/ProductList';
import SaleList from '../Sale/SalesList';
import API from '../../service/api';
import Pages from '../Pages';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [],
      totalPages: 0,
      page: 0,
    };
  }

  componentDidMount() {
    if (this.props.location.state.previousPath === '/products') {
      console.log(`/search/product/${this.props.location.state.searchInput}/${this.state.page}`);
      API.get(`/search/product/${this.props.location.state.searchInput}/${this.state.page}`)
        .then((res) => this.setState({ resultList: res.content, totalPages: res.totalPages }))
        .catch((e) => console.log(e));
    } else {
      API.get(`/search/sale/${this.props.location.state.searchInput}/${this.state.page}`)
        .then((res) => this.setState({ resultList: res.content, totalPages: res.totalPages }))
        .catch((e) => console.log(e));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state.searchInput !== this.props.location.state.searchInput) {
      if (this.props.location.state.previousPath === '/products') {
        API.get(`/search/product/${this.props.location.state.searchInput}/${this.state.page}`)
          .then((res) => this.setState({ resultList: res.content, totalPages: res.totalPages }))
          .catch((e) => console.log(e));
      } else {
        API.get(`/search/sale/${this.props.location.state.searchInput}/${this.state.page}`)
          .then((res) => this.setState({ resultList: res.content, totalPages: res.totalPages }))
          .catch((e) => console.log(e));
      }
    }
  }

  handleChangePage(value) {
    const selectedPage = value - 1;
    if (this.props.location.state.previousPath === '/products') {
      API.get(`/search/product/${this.props.location.state.searchInput}/${selectedPage}`)
        .then((res) => this.setState({ resultList: res.content, page: selectedPage }))
        .catch((e) => console.log(e));
    } else {
      API.get(`/search/sale/${this.props.location.state.searchInput}/${selectedPage}`)
        .then((res) => this.setState({ resultList: res.content, page: selectedPage }))
        .catch((e) => console.log(e));
    }
  }

  whereToSearch() {
    if (this.props.location.state.previousPath === '/products') {
      return 'Productos';
    }
    return 'Ventas';
  }

  renderResult() {
    if (this.props.location.state.previousPath === '/products') {
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
        <Header category={`Resultado de ${this.props.location.state.searchInput} en ${this.whereToSearch()}`} />
        {this.renderResult()}
        <Pages page={this.state.page + 1} onChange={(value) => this.handleChangePage(value)} count={this.state.totalPages} color="primary" />
      </div>
    );
  }
}
