import React from 'react';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Swal from 'sweetalert2';
import '../../style/AddModal.css';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import API from '../../service/api.js';

export default class AddModal extends React.Component {
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
    };
    API.put('/product', body)
      .then(() => this.productUpdated())
      .catch((e) => this.error(e.response.data));
  }

  render() {
    // Importante: PONER ESTE IS VALID DENTRO DEL RENDER,SINO NO FUNCIONA
    const isValid = this.state.code > 0
    && this.state.name !== ''
    && this.state.unitPrice > 0
    && this.state.packageDiscount >= 0
    && this.state.amountForDiscount > 0
    && this.state.stock >= 0
    && this.state.amountPerPackage > 0;
    return (
      <div>
        <div className="add">
          <Button className="buttons" color="primary" aria-label="add" onClick={() => this.openDialog()}>
            <EditIcon />
          </Button>
        </div>
        <Dialog open={this.state.open}>
          <DialogTitle>Editar producto</DialogTitle>
          <form className="form" noValidate autoComplete="off">
            <div className="Row">
              <TextField value={this.state.name} className="name" required id="standard-name" label="Nombre" onChange={(e) => this.handleName(e)} />
            </div>
            <div className="Row">
              <TextField disabled value={this.state.code} className="textField" type="number" required id="standard-name" label="Codigo" onChange={(e) => this.handleCode(e)} />
              <TextField value={this.state.unitPrice} type="number" className="textField" required id="standard-name" label="Precio unitario" onChange={(e) => this.handleUnitPrice(e)} helperText="Mayor a cero" />
            </div>
            <div className="Row">
              <TextField value={this.state.stock} type="number" className="textField" required id="standard-name" label="Stock" onChange={(e) => this.handleStock(e)} helperText="En unidades" />
              <TextField value={this.state.amountForDiscount} type="number" className="textField" required id="standard-name" label="Cantidad mayorista" onChange={(e) => this.handleAmountForDiscount(e)} helperText="En unidades" />
            </div>
            <div className="Row">
              <TextField value={this.state.packageDiscount} type="number" className="textField" required id="standard-name" label="Descuento por mayor" onChange={(e) => this.handlePackageDiscount(e)} helperText="Es un porcentaje" />
              <TextField value={this.state.amountPerPackage} type="number" className="textField" required id="standard-name" label="Cantidad por bulto" onChange={(e) => this.handleAmount(e)} helperText="Mayor a cero" />
            </div>
            <div className="Row">
              <div className="Column">
                <div className="container">
                  <Fab className="confirm" disabled={!isValid} color="primary" aria-label="add" onClick={() => this.put()}>
                    <CheckIcon />
                  </Fab>
                </div>
              </div>
              <div className="Column">
                <div className="container">
                  <Fab className="confirm" style={{ color: '#3f51b5' }} aria-label="close" onClick={() => this.closeDialog()}>
                    <CancelIcon stye={{ color: 'blue' }} />
                  </Fab>
                </div>
              </div>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}