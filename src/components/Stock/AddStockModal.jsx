import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import IntroIcon from '@material-ui/icons/KeyboardReturn';
import Swal from 'sweetalert2';
import '../../style/AddModal.css';
import '../../style/AddStockModal.css';
import API from '../../service/api.js';

class AddStockModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      code: '',
      quantity: '',
      addButton: true,
      product: { name: '', amountPerPackage: 1 },
    };
    this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  getBody() {
    if (this.state.addButton) {
      return { quantity: this.state.quantity, op: 'add' };
    }
    return { quantity: this.state.quantity, op: 'substract' };
  }

  handleEnter() {
    if (document.activeElement.id === 'stockCodeInput') {
      API.get(`/product/${this.state.code}`)
        .then((res) => this.setState({ product: res }))
        .catch(() => this.setState({ product: { name: 'Producto inexistente' } }));
    }
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }

  showModal(b) {
    this.setState({
      open: b,
    });
  }

  plusBtn() {
    this.setState({ addButton: true });
  }

  minusBtn() {
    this.setState({ addButton: false });
  }

  handleCodeChange(e) {
    this.setState({ code: e.target.value });
  }

  handleQuantity(e) {
    e.preventDefault();
    this.setState({ quantity: e.target.value });
  }

  packages() {
    return `${Math.floor(this.state.quantity / this.state.product.amountPerPackage || 0)} bulto(s),
    ${this.state.quantity % this.state.product.amountPerPackage || 0} unidad(es)`;
  }

  success() {
    Swal.fire(
      'Bien!',
      'Stock actualizado',
      'success',
    );
    window.location.reload(false);
  }

  error() {
    Swal.fire(
      'Error!',
      'Stock insuficiente',
      'error',
    );
  }

  post() {
    this.showModal(false);
    const body = this.getBody();
    API.post(`/product/changeStock/${this.state.code}`, body)
      .then(() => this.success())
      .catch(() => this.error());
  }

  buttons(isValid) {
    return (
      <div className="stock-button-container">
        <div className="stock-check">
          <Fab
            className="stock-check"
            disabled={!isValid}
            color="primary"
            aria-label="stock"
            onClick={() => this.post()}
          >
            <CheckIcon />
          </Fab>
        </div>
        <div className="stock-cancel">
          <Fab
            style={{ color: '#3f51b5' }}
            aria-label="close"
            onClick={() => this.showModal(false)}
          >
            <CancelIcon stye={{ color: 'blue' }} />
          </Fab>
        </div>
      </div>
    );
  }

  render() {
    const btnVariant = this.state.addButton ? 'primary' : '';
    const btnVariantm = this.state.addButton ? '' : 'primary';
    const isCodeError = this.state.product.name === 'Producto inexistente';
    const isValid = this.state.code > 0 && this.state.quantity > 0 && !isCodeError;
    return (
      <div>
        <Button className="add-stock" variant="outlined" onClick={() => this.showModal(true)}>Modificar stock</Button>
        <Dialog open={this.state.open} className="">
          <DialogTitle>Editar stock</DialogTitle>
          <form className="form-addStock" noValidate autoComplete="off">
            <div className="Row">
              <TextField error={isCodeError} type="number" value={this.state.code} className="codeField-AddStock" required id="stockCodeInput" label="Codigo" onChange={(e) => this.handleCodeChange(e)} />
              <IntroIcon className="introIcon-AddStock" />
              <TextField value={this.state.product.name} disabled className="textField" label="Nombre" />
            </div>
            <div className="Row">
              <ButtonGroup className="buttonGroup" variant="contained">
                <Button color={btnVariant} onClick={() => this.plusBtn()}>Agregar</Button>
                <Button color={btnVariantm} onClick={() => this.minusBtn()}>Restar</Button>
              </ButtonGroup>
              <TextField value={this.state.quantity} type="number" className="textField" required label="Cantidad en unidades" helperText={this.packages()} onChange={(e) => this.handleQuantity(e)} />
            </div>
            {this.buttons(isValid)}
          </form>
        </Dialog>
      </div>
    );
  }
}

export default AddStockModal;
