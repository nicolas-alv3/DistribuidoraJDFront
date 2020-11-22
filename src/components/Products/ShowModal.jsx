import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import DialogTitle from '@material-ui/core/DialogTitle';
import { parsePesos } from '../../utils/utils.js';
import '../../style/AddModal.css';

export default class ShowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  openDialog() {
    this.setState({ open: true });
  }

  closeDialog() {
    this.setState({ open: false });
  }

  calculatePriceWithDiscount() {
    return this.props.product.unitPrice
     - (this.props.product.unitPrice / 100) * this.props.product.packageDiscount;
  }

  buttons() {
    return (
      <div className="show-add-button-container">
        <Fab
          className="show-add-check"
          color="primary"
          aria-label="add"
          onClick={() => this.closeDialog()}
        >
          <CheckIcon />
        </Fab>
      </div>
    );
  }

  inputName() {
    return (
      <TextField
        value={this.props.product.name}
        className="name"
        required
        label="Nombre"
        disabled
      />
    );
  }

  inputCode() {
    return (
      <TextField
        value={this.props.product.code}
        className="textField"
        type="number"
        required
        label="Codigo"
        disabled
      />
    );
  }

  inputUnitPrice() {
    return (
      <TextField
        value={this.props.product.unitPrice}
        type="number"
        className="textField"
        required
        label="Precio unitario"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        disabled
      />
    );
  }

  inputStock() {
    return (
      <TextField
        value={this.props.product.stock}
        type="number"
        className="textField"
        required
        label="Stock"
        InputProps={{
          endAdornment: <InputAdornment position="end"> (unidades)</InputAdornment>,
        }}
        disabled
      />
    );
  }

  inputPackageDiscount() {
    return (
      <TextField
        value={this.props.product.packageDiscount}
        type="number"
        className="textField"
        required
        label="Descuento por mayor"
        InputProps={{
          startAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
        disabled
      />
    );
  }

  inputAmountForDiscount() {
    return (
      <TextField
        value={this.props.product.amountForDiscount}
        type="number"
        className="textField"
        required
        label="Cant. mayorista"
        InputProps={{
          endAdornment: <InputAdornment position="end">(unidades)</InputAdornment>,
        }}
        disabled
      />
    );
  }

  inputAmountPerPackage() {
    return (
      <TextField
        value={this.props.product.amountPerPackage}
        type="number"
        className="textField"
        required
        id="standard-name"
        label="Cantidad por bulto"
        InputProps={{
          endAdornment: <InputAdornment position="end"> (unidades)</InputAdornment>,
        }}
        disabled
      />
    );
  }

  dialog() {
    return (
      <Dialog open={this.state.open}>
        <DialogTitle>Ver producto</DialogTitle>
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
          <hr />
          <div className="Row show-text">
            Si vendés mas de <b>{this.props.product.amountForDiscount} unidades</b>,
            el precio será <b>{parsePesos(this.calculatePriceWithDiscount().toString())}</b>.
          </div>
          <hr />
          <div className="Row show-text">
            Las unidades en stock corresponden a
            <b>
              { Math.floor(this.props.product.stock / this.props.product.amountPerPackage)} bulto/s
            </b>,
            y <b>{this.props.product.stock % this.props.product.amountPerPackage} unidad/es</b>.
          </div>
          {this.buttons()}
        </form>
      </Dialog>
    );
  }

  render() {
    return (
      <div className="add-column">
        <div className="add">
          <Button className="buttons" color="primary" aria-label="add" onClick={() => this.openDialog()}>
            <VisibilityIcon />
          </Button>
        </div>
        {this.dialog()}
      </div>
    );
  }
}
