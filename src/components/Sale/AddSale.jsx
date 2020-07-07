import React from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';
import Header from '../Products/Header';
import '../../style/AddSale.css';
import { parsePesos } from '../../utils/utils.js';
import API from '../../service/api';
import SaleItem from './SaleItem';

export default class AddSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      items: [],
      currentItem: this.defaultItem(),
      unitAmount: 0,
      packageAmount: 0,
      description: '',
    };
  }

  componentDidMount() {
    // Solo de prueba
    // API.get('/product/all/0')
    //   .then((res) => this.setItems(res.content));
  }

  setItems(products) {
    return this.setState({ items: products.map((p) => new SaleItem(p)) });
  }

  getQuantity() {
    return this.state.packageAmount
     * this.state.currentItem.getAmountPerPackage()
      + this.state.unitAmount;
  }

  totalPrice() {
    return this.state.items.reduce((ac, item) => ac + item.getTotalPrice(), 0);
  }

  delete(item) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const newItems = this.state.items.filter((i) => i !== item);
    this.setState({ items: newItems });
  }

  defaultItem() {
    return new SaleItem({
      unitPrice: 0, name: '...', amountPerPackage: 0, amountForDiscount: 0, packageDiscount: 0,
    }, 0);
  }

  sendCurrentItem() {
    this.state.items.push(this.state.currentItem);
    this.setState({
      code: '',
      currentItem: this.defaultItem(),
      unitAmount: 0,
      packageAmount: 0,
      description: '',
    });
  }

  handleCodeChange(e) {
    this.setState({ code: e.target.value });
    API.get(`/product/${e.target.value}`)
      .then((product) => this.setState({
        currentItem: new SaleItem(product, this.getQuantity()),
        description: product.name,
      }))
      .catch(() => this.setState({
        currentItem: this.defaultItem(),
        description: '',
      }));
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handlePackageAmount(e) {
    this.setState({ packageAmount: e.target.value });
    this.state.currentItem.setByPackage(parseInt(e.target.value) || 0);
  }

  handleUnitAmount(e) {
    this.setState({ unitAmount: e.target.value });
    this.state.currentItem.setByUnit(parseInt(e.target.value) || 0);
  }

  clientBox() {
    return (
      <div className="clientBox">
        <h3> Datos del cliente </h3>
        <TextField className="clientInput" value={this.state.clientName} type="text" required label="Nombre" onChange={() => {}} />
        <TextField className="clientInput" value={this.state.clientAddress} type="text" required label="Domicilio" onChange={() => {}} />
        <TextField className="clientInput" value={this.state.clientDNI} type="number" required label="D.N.I." onChange={() => {}} />
      </div>
    );
  }

  detailsBox() {
    return (
      <div className="detailsBox">
        <h3> Detalles</h3>
        <TextField multiline variant="outlined" label="Algun comentario o recordatorio..." className="detailsInput" />
      </div>
    );
  }

  searchCodeInput() {
    return (
      <div>
        <SearchIcon className="searchIcon" />
        <TextField value={this.state.code} className="searchField" type="number" label="Código" onChange={(e) => this.handleCodeChange(e)} />
      </div>
    );
  }

  renderHeader() {
    return (
      <li className="list-group-item list-group-item-secondary" key={-1}>
        <div className="row">
          <div className="col">Código</div>
          <div className="col">Descripcion</div>
          <div className="col">Cant</div>
          <div className="col">Bonificación</div>
          <div className="col">Precio unitario</div>
          <div className="col">Subtotal</div>
          <div className="col" />
        </div>
      </li>
    );
  }

  renderItems() {
    return this.state.items.map(
      (item) => (
        <li key={item.getCode()} className="list-group-item">
          <div className="row">
            <div className="col">{item.getCode()}</div>
            <div className="col">{item.getDescription()}</div>
            <div className="col">{item.getTotalAmount()} u.</div>
            <div className="col">{item.getPackageDiscount()}%</div>
            <div className="col">{parsePesos(item.getUnitPrice())}</div>
            <div className="col">{parsePesos(item.getTotalPrice().toString())}</div>
            <div className="col"><DeleteIcon style={{ color: 'red' }} onClick={() => this.delete(item)} /></div>
          </div>
        </li>
      ),
    );
  }

  renderGetProduct() {
    return (
      <li className="list-group-item list-group-item-warning" key={-2}>
        <div className="row">
          <div className="col">{this.searchCodeInput()}</div>
          <div className="col"><SearchIcon className="searchIcon" /><TextField value={this.state.description} className="searchField" type="text" label="Descripción" onChange={(e) => this.handleDescriptionChange(e)} /></div>
          <div className="col">
            <TextField className="cantField" value={this.state.packageAmount} type="text" label="Bulto/s" onChange={(e) => this.handlePackageAmount(e)} />
            <Divider className="divider" orientation="vertical" />
            <TextField className="cantField" value={this.state.unitAmount} type="text" label="Unidad/es" onChange={(e) => this.handleUnitAmount(e)} />
          </div>
          <div className="col field">{this.state.currentItem.getPackageDiscount()}%</div>
          <div className="col field">{parsePesos(this.state.currentItem.getUnitPrice())}</div>
          <div className="col field">{parsePesos(this.state.currentItem.getTotalPrice().toString())}</div>
          <div className="col field"> <SendIcon style={{ color: 'green' }} onClick={() => this.sendCurrentItem()} /> </div>
        </div>
      </li>
    );
  }

  renderFooter() {
    return (
      <li className="list-group-item list-group-item-primary" key={0}>
        Precio total: ${this.totalPrice()}
      </li>
    );
  }

  render() {
    return (
      <div>
        <Header category="Nueva venta" />
        <hr />
        {this.clientBox()}{this.detailsBox()}
        <ul className="list-group list">
          {this.renderHeader()}
          {this.renderGetProduct()}
          {this.renderItems()}
          {this.renderFooter()}
        </ul>
      </div>
    );
  }
}
