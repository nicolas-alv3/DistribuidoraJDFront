/* eslint-disable radix */
import React from 'react';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';
import { Fab } from '@material-ui/core';
import ListIcon from '@material-ui/icons/PlaylistAddCheck';
import Header from '../Products/Header';
import '../../style/AddSale.css';
import { parsePesos } from '../../utils/utils.js';
import API from '../../service/api';
import SaleItem from './SaleItem';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class AddSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      dni: '',
      details: '',
      code: '',
      items: [],
      currentItem: this.defaultItem(),
      unitAmount: 1,
      packageAmount: 0,
      description: '',
      allNames: [],
    };
    this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    // Solo de prueba
    API.get('/product/allNames')
      .then((res) => this.setAllNames(res));
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  setAllNames(names) {
    return this.setState({ allNames: names });
  }

  getQuantity() {
    return this.state.packageAmount
     * this.state.currentItem.getAmountPerPackage()
      + this.state.unitAmount;
  }

  done() {
    Swal.fire('¡Listo!', 'La venta se ha realizado con éxito', 'success');
    this.props.history.push('/sales');
  }

  postSale(b) {
    if (b) {
      const body = {
        client: {
          name: this.state.name,
          address: this.state.address,
          dni: this.state.dni,
        },
        saleItems: this.state.items.map((i) => i.getDTO()),
        details: this.state.details,
      };
      API.post('/sale', body)
        .then((res) => this.done(res))
        .catch((e) => console.log(e));
    }
  }

  confirmDialog() {
    const total = parsePesos(this.totalPrice().toString());
    Swal.fire(
      '¿Estas seguro?',
      `Son ${total} y ${this.state.items.length} items`,
      'question',
    )
      .then((res) => this.postSale(res.value));
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }

  handleEnter() {
    this.sendCurrentItem();
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
    }, 1);
  }

  existCodeInItems() {
    return this.state.items.map((i) => i.getCode()).includes(parseInt(this.state.code));
  }

  sendCurrentItem() {
    if (this.state.code && this.state.description) {
      if (!this.existCodeInItems()) { this.state.items.push(this.state.currentItem); } else { this.setState({ snackBar: true }); }
      this.setState({
        code: '',
        currentItem: this.defaultItem(),
        unitAmount: 1,
        packageAmount: 0,
        description: '',
      });
    }
  }

  errorHelperText(error) {
    if (error) {
      return 'Falta stock';
    }
    return '';
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

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeAddress(e) {
    this.setState({ address: e.target.value });
  }

  handleChangeDNI(e) {
    this.setState({ dni: e.target.value });
  }

  handleDescriptionChange(newValue) {
    this.setState({ description: newValue });
    API.get(`/product/name/${newValue}`)
      .then((product) => this.setState({
        currentItem: new SaleItem(product, this.getQuantity()),
        code: product.code,
        unitAmount: 1,
      }))
      .catch(() => this.setState({
        currentItem: this.defaultItem(),
        description: '',
      }));
  }

  handlePackageAmount(e) {
    this.setState({ packageAmount: e.target.value });
    this.state.currentItem.setByPackage(parseInt(e.target.value) || 0);
  }

  handleUnitAmount(e) {
    this.setState({ unitAmount: e.target.value });
    this.state.currentItem.setByUnit(parseInt(e.target.value) || 1);
  }

  handleDetailsChange(e) {
    this.setState({ details: e.target.value });
  }

  clientBox() {
    return (
      <div className="clientBox">
        <h3> Datos del cliente </h3>
        <TextField className="clientInput" value={this.state.clientName} type="text" required label="Nombre" onChange={(e) => { this.handleChangeName(e); }} />
        <TextField className="clientInput" value={this.state.clientAddress} type="text" required label="Domicilio" onChange={(e) => { this.handleChangeAddress(e); }} />
        <TextField className="clientInput" value={this.state.clientDNI} type="number" required label="D.N.I." onChange={(e) => { this.handleChangeDNI(e); }} />
      </div>
    );
  }

  detailsBox() {
    return (
      <div className="detailsBox">
        <h3> Detalles</h3>
        <TextField multiline value={this.state.details} variant="outlined" label="¿Algun comentario o recordatorio?" className="detailsInput" onChange={(e) => this.handleDetailsChange(e)} />
      </div>
    );
  }

  sendSaleButton(isDisabled) {
    return (
      <div className="button-container">
        <Fab className="sendSaleButton" variant="extended" disabled={isDisabled} onClick={() => this.confirmDialog()}>
          <ListIcon />
          FINALIZAR
        </Fab>
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

  searchDescriptionInput() {
    return (
      <div>
        <SearchIcon className="searchIcon" />
        <Autocomplete
          options={this.state.allNames}
          value={this.state.description}
          type="text"
          style={{
            width: '70%', display: 'inline-block', position: 'absolute', bottom: '5px',
          }}
          getOptionLabel={(option) => option}
          label="Descripción"
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Descripción" />}
          onChange={(_, newValue) => this.handleDescriptionChange(newValue)}
        />
      </div>
    );
  }

  renderHeader() {
    return (
      <li className="list-group-item header" key={-1}>
        <div className="row header">
          <div className="col">Código</div>
          <div className="col">Descripción</div>
          <div className="col">Cantidad</div>
          <div className="col">Bonificación</div>
          <div className="col">Precio unitario</div>
          <div className="col">Subtotal</div>
          <div className="lcol" />
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
            <div className="col">{parsePesos(item.getTotalPrice().toString())}<DeleteIcon className="deleteIcon" onClick={() => this.delete(item)} /></div>
          </div>
        </li>
      ),
    );
  }

  renderGetProduct(quantityError) {
    return (
      <li className="list-group-item get" key={-2}>
        <div className="row">
          <div className="col">{this.searchCodeInput()}</div>
          <div className="col">{this.searchDescriptionInput()}</div>
          <div className="col">
            <TextField error={quantityError} className="cantField" value={this.state.packageAmount} type="text" label="Bulto/s" onChange={(e) => this.handlePackageAmount(e)} />
            <Divider className="vertical-divider" orientation="vertical" />
            <TextField error={quantityError} className="cantField" value={this.state.unitAmount} type="text" label="Unidad/es" onChange={(e) => this.handleUnitAmount(e)} />
          </div>
          <div className="col field">{this.state.currentItem.getPackageDiscount()}%</div>
          <div className="col field">{parsePesos(this.state.currentItem.getUnitPrice().toString())}</div>
          <div className="col field">{parsePesos(this.state.currentItem.getTotalPrice().toString())}<SendIcon className="sendIcon" onClick={() => this.sendCurrentItem()} /></div>
        </div>
      </li>
    );
  }

  renderFooter() {
    return (
      <li className="list-group-item footer" key={0}>
        <div className="totalPrice">Total: ${this.totalPrice()}</div>
      </li>
    );
  }

  snackBar() {
    return (
      <Snackbar
        open={this.state.snackBar}
        autoHideDuration={6000}
        onClose={() => this.setState({ snackBar: false })}
      >
        <Alert variant="outlined" onClose={() => this.setState({ snackBar: false })} severity="error">
          Ya cargaste este producto en la venta, edítalo.
        </Alert>
      </Snackbar>
    );
  }

  render() {
    const quantityError = this.state.currentItem.isError();
    const disabledButton = this.state.items.length <= 0;
    return (
      <div>
        <Header category="Nueva venta" />
        {this.clientBox()}{this.detailsBox()}
        <ul className="list-group list">
          {this.renderHeader()}
          {this.renderGetProduct(quantityError)}
          {this.renderItems()}
          {this.renderFooter()}
        </ul>
        {this.sendSaleButton(disabledButton)}
        {this.snackBar()}
      </div>
    );
  }
}
