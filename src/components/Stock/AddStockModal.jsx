import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
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
  }

  getBody() {
    if (this.state.addButton) {
      return { quantity: this.state.quantity, op: 'add' };
    }
    return { quantity: this.state.quantity, op: 'substract' };
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
    e.preventDefault();
    this.setState({ code: e.target.value });
    API.get(`/product/${e.target.value}`)
      .then((res) => this.setState({ product: res }))
      .catch(() => console.log());
  }

  handleQuantity(e) {
    e.preventDefault();
    this.setState({ quantity: e.target.value });
  }

  packages() {
    return `${Math.floor(this.state.quantity / this.state.product.amountPerPackage)} bulto(s),
    ${this.state.quantity % this.state.product.amountPerPackage} unidad(es)`;
  }

  success() {
    Swal.fire(
      'Bien!',
      'Stock actualizado',
      'success',
    );
    window.location.reload();
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
      .catch((e) => this.error());
  }

  render() {
    const isValid = this.state.code > 0 && this.state.quantity > 0;
    const btnVariant = this.state.addButton ? 'primary' : '';
    const btnVariantm = this.state.addButton ? '' : 'primary';
    return (
      <div>
        <Button className="add-stock" variant="outlined" onClick={() => this.showModal(true)}>Modificar stock</Button>
        <Dialog open={this.state.open}>
          <DialogTitle>Editar stock</DialogTitle>
          <form className="form" noValidate autoComplete="off">
            <div className="Row">
              <TextField value={this.state.code} className="textField" required id="standard-name" label="Codigo" onChange={(e) => this.handleCodeChange(e)} />
              <TextField value={this.state.product.name} disabled className="textField" required id="standard-name" label="Nombre" />
            </div>
            <div className="Row">
              <ButtonGroup className="buttonGroup" variant="contained">
                <Button color={btnVariant} onClick={() => this.plusBtn()}>Agregar</Button>
                <Button color={btnVariantm} onClick={() => this.minusBtn()}>Restar</Button>
              </ButtonGroup>
              <TextField value={this.state.quantity} type="number" className="textField" required id="standard-name" label="Cantidad en unidades" helperText={this.packages()} onChange={(e) => this.handleQuantity(e)} />
            </div>
            <div className="Row">
              <div className="Column">
                <div className="container">
                  <Fab className="confirm" disabled={!isValid} color="primary" aria-label="add" onClick={() => this.post()}>
                    <CheckIcon />
                  </Fab>
                </div>
              </div>
              <div className="Column">
                <div className="container">
                  <Fab className="confirm" style={{ color: '#3f51b5' }} aria-label="close" onClick={() => this.showModal(false)}>
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

export default AddStockModal;
