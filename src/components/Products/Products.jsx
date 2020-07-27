/* eslint-disable no-console */
import React from 'react';
import Header from '../Header';
import AddStockModal from '../Stock/AddStockModal';
import AddModal from './AddModal';
import ProductList from './ProductList';
import API from '../../service/api.js';
import Pages from '../Pages';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      totalPages: 1,
      page: 0,
    };
  }

  componentDidMount() {
    API.get(`/product/all/${this.state.page}`)
      .then((res) => this.setState({ products: res.content, totalPages: res.totalPages }))
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

  render() {
    return (
      <div>
        <Header category="Productos" button1={<AddStockModal />} button2={<AddModal />} />
        <ProductList products={this.state.products} message="Aún no tienes productos ¿Empezamos?" />
        <Pages visible page={this.state.page + 1} onChange={(value) => this.handleChangePage(value)} count={this.state.totalPages} color="primary" />
        <button type="button" onClick={() => this.props.history.push('/report')}>Report</button>
      </div>
    );
  }
}
