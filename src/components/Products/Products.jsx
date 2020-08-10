/* eslint-disable no-console */
import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Header from '../Header';
import AddStockModal from '../Stock/AddStockModal';
import AddModal from './AddModal';
import ProductList from './ProductList';
import API from '../../service/api.js';
import Pages from '../Pages';
import '../../style/Pagination.css';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      totalPages: 1,
      page: 0,
      loading: true,
    };
  }

  componentDidMount() {
    API.get(`/product/all/${this.state.page}`)
      .then((res) => this.setState({
        products: res.content,
        totalPages: res.totalPages,
        loading: false,
      }))
      .catch((e) => console.log(e));
  }

  handleChangePage(value) {
    API.get(`/product/all/${value - 1}`)
      .then((res) => this.setState({
        products: res.content,
        totalPages: res.totalPages,
        page: res.pageable.pageNumber,
      }))
      .catch((e) => console.log(e));
  }

  renderList() {
    if (this.state.loading) return <div className="spinner-container"><CircularProgress className="spinner" /></div>;
    return <ProductList products={this.state.products} message="Aún no tienes productos ¿Empezamos?" />;
  }

  render() {
    return (
      <div>
        <Header category="Productos" button1={<AddStockModal />} button2={<AddModal />} />
        {this.renderList()}
        <Pages visible page={this.state.page + 1} onChange={(value) => this.handleChangePage(value)} count={this.state.totalPages} color="primary" />
      </div>
    );
  }
}
