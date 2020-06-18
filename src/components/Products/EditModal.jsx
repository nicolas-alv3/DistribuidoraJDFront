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
      name: this.props.product.name,
      code: this.props.product.code,
      unitPrice: this.props.product.unitPrice,
      packagePrice: this.props.product.packagePrice,
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
    this.setState({ unitPrice: e.target.value });
  }

  handlePackagePrice(e) {
    this.setState({ packagePrice: e.target.value });
  }

  handleAmount(e) {
    this.setState({ amountPerPackage: e.target.value });
  }

  productUpdated() {
    Swal.fire(
      'Bien!',
      'Producto actualizado',
      'success',
    );
    window.location.reload();
  }

  put() {
    this.closeDialog();
    const body = {
      name: this.state.name,
      code: this.state.code,
      unitPrice: this.state.unitPrice,
      packagePrice: this.state.packagePrice,
      amountPerPackage: this.state.amountPerPackage,
      stock: this.state.stock,
    };
    API.put('/product', body)
      .then(() => this.productUpdated())
      .catch((e) => this.error(e));
  }

  render() {
    return (
      <div>
        <div className="add">
          <Button className="buttons" color="primary" aria-label="add" onClick={this.openDialog.bind(this)}>
            <EditIcon className="" />
          </Button>
        </div>
        <Dialog open={this.state.open}>
          <DialogTitle>Editar producto</DialogTitle>
          <form className="form" autoComplete="off" noValidate>
            <div className="Row">
            <TextField value={this.state.code} disabled type="number" className="textField" required id="standard-name" label="Codigo" onChange={(e) => this.handleCode(e)} />
              <TextField value={this.state.name} className="textField" required id="standard-name" label="Nombre" onChange={(e) => this.handleName(e)} />
            </div>
            <div className="Row">
              <TextField value={this.state.stock} type="number" className="textField" required id="standard-name" label="Stock" onChange={(e) => this.handleStock(e)} />
              <TextField value={this.state.unitPrice} className="textField" required id="standard-name" label="Precio unitario" onChange={(e) => this.handleUnitPrice(e)} />
            </div>
            <div className="Row">
              <TextField value={this.state.packagePrice} className="textField" required id="standard-name" label="Precio por bulto" onChange={(e) => this.handlePackagePrice(e)} />
              <TextField value={this.state.amountPerPackage} className="textField" required id="standard-name" label="Cantidad por bulto" onChange={(e) => this.handleAmount(e)} />
            </div>
            <div className="Row">
              <div className="Column">
                <Fab className="confirm submit" color="primary" aria-label="add" onClick={this.put.bind(this)}>
                  <CheckIcon />
                </Fab>
              </div>
              <div className="Column">
                <Fab className="cancel" color="primary" aria-label="add" onClick={this.closeDialog.bind(this)}>
                  <CancelIcon />
                </Fab>
              </div>
            </div>
          </form>
          <h3>{this.state.errorMsg}</h3>
        </Dialog>
      </div>
    );
  }
}
