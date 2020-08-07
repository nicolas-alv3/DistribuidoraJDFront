/* eslint-disable no-console */
import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddSaleIcon from '@material-ui/icons/AddShoppingCart';
import Header from '../Header';
import SalesList from './SalesList.jsx';
import API from '../../service/api.js';
import Pages from '../Pages';

export default class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      totalPages: 0,
      page: 0,
    };
  }

  componentDidMount() {
    API.get(`/sale/all/${this.state.page}`)
      .then((res) => this.setState({ sales: res.content, totalPages: res.totalPages }))
      .catch((e) => console.log(e));
  }

  handleChangePage(value) {
    API.get(`/sale/all/${value - 1}`)
      .then((res) => this.setState({
        sales: res.content,
        totalPages: res.totalPages,
        page: res.pageable.pageNumber,
      }))
      .catch((e) => console.log(e));
  }

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
        <SalesList sales={this.state.sales} message="No tienes ventas registradas, ¿Empezamos?" />
        <Pages page={this.state.page + 1} onChange={(value) => this.handleChangePage(value)} count={this.state.totalPages} color="primary" />
      </div>
    );
  }
}
