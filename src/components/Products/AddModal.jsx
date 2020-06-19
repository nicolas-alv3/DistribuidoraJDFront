import React from 'react';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
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
      name: '',
      code: 0,
      unitPrice: 0,
      packagePrice: 0,
      amountPerPackage: 0,
      stock: 0,
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

  handlePackagePrice(e) {
    e.preventDefault();
    this.setState({ packagePrice: e.target.value });
  }

  handleAmount(e) {
    this.setState({ amountPerPackage: e.target.value });
  }

  productCreated() {
    Swal.fire(
      'Bien!',
      'Producto Creado',
      'success',
    );
    window.location.reload();
  }

  error() {
    Swal.fire(
      'Uy',
      'Hubo un error',
      'error',
    );
  }

  post() {
    this.closeDialog();
    const body = {
      name: this.state.name,
      code: this.state.code,
      unitPrice: this.state.unitPrice,
      packagePrice: this.state.packagePrice,
      amountPerPackage: this.state.amountPerPackage,
      stock: this.state.stock,
    };
    API.post('/product', body)
      .then(() => this.productCreated())
      .catch((e) => this.error(e));
  }

  render() {
    // Importante: PONER ESTE IS VALID DENTRO DEL RENDER,SINO NO FUNCIONA
    const isValid = this.state.code > 0
    && this.state.name !== ''
    && this.state.unitPrice > 0
    && this.state.packagePrice > 0
    && this.state.stock >= 0
    && this.state.amountPerPackage > 0;
    return (
      <div>
        <div className="add">
          <Fab color="primary" aria-label="add" onClick={() => this.openDialog()}>
            <AddIcon />
          </Fab>
        </div>
        <Dialog open={this.state.open}>
          <DialogTitle>Agregar producto</DialogTitle>
          <form className="form" noValidate autoComplete="off">
            <div className="Row">
              <TextField value={this.state.code} className="textField" type="number" required id="standard-name" label="Codigo" onChange={(e) => this.handleCode(e)} />
              <TextField value={this.state.name} className="textField" required id="standard-name" label="Nombre" onChange={(e) => this.handleName(e)} />
            </div>
            <div className="Row">
              <TextField value={this.state.stock} type="number" className="textField" required id="standard-name" label="Stock" onChange={(e) => this.handleStock(e)} />
              <TextField value={this.state.unitPrice} type="number" className="textField" required id="standard-name" label="Precio unitario" onChange={(e) => this.handleUnitPrice(e)} helperText="Mayor a cero" />
            </div>
            <div className="Row">
              <TextField value={this.state.packagePrice} type="number" className="textField" required id="standard-name" label="Precio por bulto" onChange={(e) => this.handlePackagePrice(e)} />
              <TextField value={this.state.amountPerPackage} type="number" className="textField" required id="standard-name" label="Cantidad por bulto" onChange={(e) => this.handleAmount(e)} helperText="Mayor a cero" />
            </div>
            <div className="Row">
              <div className="Column">
                <Fab className="confirm" disabled={!isValid} color="primary" aria-label="add" onClick={() => this.post()}>
                  <CheckIcon />
                </Fab>
              </div>
              <div className="Column">
                <Fab className="confirm" color="primary" aria-label="add">
                  <CancelIcon onClick={() => this.closeDialog()} />
                </Fab>
              </div>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}
