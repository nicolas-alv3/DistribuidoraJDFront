import React from 'react';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import InputAdornment from '@material-ui/core/InputAdornment';
import CancelIcon from '@material-ui/icons/Cancel';
import Swal from 'sweetalert2';
import '../../style/AddModal.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import API from '../../service/api.js';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      code: '',
      name: '',
      unitPrice: '',
      packageDiscount: '', // Porcentual
      amountForDiscount: '',
      amountPerPackage: '',
      stock: '',
    };
  }

  openDialog() {
    this.setState({ open: true });
  }

  closeDialog() {
    this.setState({ open: false });
  }

  isValid() {
    return this.state.code > 0
    && this.state.name !== ''
    && this.state.unitPrice > 0
    && this.state.packageDiscount >= 0
    && this.state.amountForDiscount > 0
    && this.state.stock >= 0
    && this.state.amountPerPackage > 0;
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }

  handleCode(e) {
    this.setState({ code: e.target.value });
  }

  handleStock(e) {
    this.setState({ stock: e.target.value });
  }

  handleUnitPrice(e) {
    e.preventDefault();
    this.setState({ unitPrice: e.target.value });
  }

  handlePackageDiscount(e) {
    e.preventDefault();
    this.setState({ packageDiscount: e.target.value });
  }

  handleAmount(e) {
    this.setState({ amountPerPackage: e.target.value });
  }

  handleAmountForDiscount(e) {
    this.setState({ amountForDiscount: e.target.value });
  }

  productCreated() {
    Swal.fire(
      'Bien!',
      'Producto Creado',
      'success',
    );
    window.location.reload();
  }

  error(message) {
    Swal.fire(
      'Uy',
      message,
      'error',
    );
  }

  post() {
    this.closeDialog();
    const body = {
      name: this.state.name,
      code: this.state.code,
      unitPrice: this.state.unitPrice,
      packageDiscount: this.state.packageDiscount,
      amountPerPackage: this.state.amountPerPackage,
      amountForDiscount: this.state.amountForDiscount,
      stock: this.state.stock,
    };
    API.post('/product', body)
      .then(() => this.productCreated())
      .catch((e) => this.error(e.response.data));
  }

  inputName() {
    return <TextField value={this.state.name} className="name" required label="Nombre" onChange={(e) => this.handleName(e)} />;
  }

  inputCode() {
    return (
      <TextField
        value={this.state.code}
        className="textField"
        type="number"
        required
        label="Codigo"
        onChange={(e) => this.handleCode(e)}
      />
    );
  }

  inputUnitPrice() {
    return (
      <TextField
        value={this.state.unitPrice}
        type="number"
        className="textField"
        required
        label="Precio unitario"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={(e) => this.handleUnitPrice(e)}
        helperText="Mayor a cero"
      />
    );
  }

  inputStock() {
    return (
      <TextField
        value={this.state.stock}
        type="number"
        className="textField"
        required
        label="Stock"
        InputProps={{
          endAdornment: <InputAdornment position="end"> (unidades)</InputAdornment>,
        }}
        onChange={(e) => this.handleStock(e)}
      />
    );
  }

  inputPackageDiscount() {
    return (
      <TextField
        value={this.state.packageDiscount}
        type="number"
        className="textField"
        required
        label="Descuento por mayor"
        InputProps={{
          startAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
        onChange={(e) => this.handlePackageDiscount(e)}
      />
    );
  }

  inputAmountForDiscount() {
    return (
      <TextField
        value={this.state.amountForDiscount}
        type="number"
        className="textField"
        required
        label="Cant. mayorista"
        InputProps={{
          endAdornment: <InputAdornment position="end">(unidades)</InputAdornment>,
        }}
        onChange={(e) => this.handleAmountForDiscount(e)}
      />
    );
  }

  inputAmountPerPackage() {
    return (
      <TextField
        value={this.state.amountPerPackage}
        type="number"
        className="textField"
        required
        id="standard-name"
        label="Cantidad por bulto"
        InputProps={{
          endAdornment: <InputAdornment position="end"> (unidades)</InputAdornment>,
        }}
        onChange={(e) => this.handleAmount(e)}
        helperText="Mayor a cero"
      />
    );
  }

  buttons(isValid) {
    return (
      <div className="add-button-container">
        <div className="add-check">
          <Fab
            className="add-check"
            disabled={!isValid}
            color="primary"
            aria-label="add"
            onClick={() => this.post()}
          >
            <CheckIcon />
          </Fab>
        </div>
        <div className="add-cancel">
          <Fab
            style={{ color: '#3f51b5' }}
            aria-label="close"
            onClick={() => this.closeDialog()}
          >
            <CancelIcon stye={{ color: 'blue' }} />
          </Fab>
        </div>
      </div>
    );
  }

  dialog(isValid) {
    return (
      <Dialog open={this.state.open}>
        <DialogTitle>Agregar producto</DialogTitle>
        <form className="form" noValidate autoComplete="off">
          <div className="Row">
            {this.inputName()}
          </div>
          <div className="Row">
            {this.inputCode()}
            {this.inputUnitPrice()}
          </div>
          <div className="Row">
            {this.inputStock()}
            {this.inputAmountForDiscount()}
          </div>
          <div className="Row">
            {this.inputPackageDiscount()}
            {this.inputAmountPerPackage()}
          </div>
          {this.buttons(isValid)}
        </form>
      </Dialog>
    );
  }

  render() {
    // Importante: PONER ESTE IS VALID DENTRO DEL RENDER,SINO NO FUNCIONA
    const isValid = this.isValid();
    return (
      <div className="add-column">
        <Fab color="primary" aria-label="add" onClick={() => this.openDialog()}>
          <AddIcon />
        </Fab>
        {this.dialog(isValid)}
      </div>
    );
  }
}
