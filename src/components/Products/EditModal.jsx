import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Swal from 'sweetalert2';
import '../../style/AddModal.css';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import API from '../../service/api.js';

export default class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      code: this.props.product.code,
      name: this.props.product.name,
      unitPrice: this.props.product.unitPrice,
      packageDiscount: this.props.product.packageDiscount, // Porcentual
      amountForDiscount: this.props.product.amountForDiscount,
      amountPerPackage: this.props.product.amountPerPackage,
      stock: this.props.product.stock,
      category : this.props.product.category,
    };
  }

  openDialog() {
    this.setState({ open: true });
  }

  closeDialog() {
    this.setState({ open: false });
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

  handleCategory(e) {
    this.setState({ category: e.target.value });
  }

  productUpdated() {
    Swal.fire(
      'Bien!',
      'Producto actualizado',
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

  put() {
    this.closeDialog();
    const body = {
      name: this.state.name,
      code: this.state.code,
      unitPrice: this.state.unitPrice,
      packageDiscount: this.state.packageDiscount,
      amountPerPackage: this.state.amountPerPackage,
      amountForDiscount: this.state.amountForDiscount,
      stock: this.state.stock,
      category: this.state.category,
    };
    API.put('/product', body)
      .then(() => this.productUpdated())
      .catch((e) => this.error(e.response.data));
  }

  inputName() {
    return <TextField value={this.state.name} className="textField " required label="Nombre" onChange={(e) => this.handleName(e)} />;
  }

  inputCategory() {
    return (
      <FormControl className="add-selector">
        <InputLabel>Categoría</InputLabel>
        <Select
          value={this.state.category}
          onChange={(e) => this.handleCategory(e)}
        >
          <MenuItem value="GALLETITAS">Galletitas</MenuItem>
          <MenuItem value="CIGARRILLOS">Cigarrillos</MenuItem>
          <MenuItem value="ANALGESICOS">Analgesicos</MenuItem>
          <MenuItem value="VARIOS">Varios</MenuItem>
          <MenuItem value="GASEOSAS">Gaseosas</MenuItem>
          <MenuItem value="GOLOSINAS">Golosinas</MenuItem>
        </Select>
      </FormControl>
    );
  }

  inputCode() {
    return (
      <TextField
        value={this.state.code}
        className="textField"
        type="number"
        required
        disabled
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
            onClick={() => this.put()}
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
        <DialogTitle>Editar producto</DialogTitle>
        <form className="form" noValidate autoComplete="off">
          <div className="Row">
            {this.inputName()}
            {this.inputCategory()}
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
    const isValid = this.state.code > 0
    && this.state.name !== ''
    && this.state.unitPrice > 0
    && this.state.packageDiscount >= 0
    && this.state.amountForDiscount > 0
    && this.state.stock >= 0
    && this.state.amountPerPackage > 0
    && this.state.category !== '';
    return (
      <div>
        <div className="add">
          <Button className="buttons" color="primary" aria-label="add" onClick={() => this.openDialog()}>
            <EditIcon />
          </Button>
        </div>
        {this.dialog(isValid)}
      </div>
    );
  }
}
