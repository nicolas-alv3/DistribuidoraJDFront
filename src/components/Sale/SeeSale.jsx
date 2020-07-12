/* eslint-disable radix */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Fab } from '@material-ui/core';
import Header from '../Products/Header';
import '../../style/AddSale.css';
import { parsePesos } from '../../utils/utils.js';
import SaleItem from './SaleItem';

export default class SeeSale extends React.Component {
  back() {
    this.props.history.goBack();
  }

  clientBox() {
    return (
      <div className="clientBox">
        <h3> Datos del cliente </h3>
        <TextField className="clientInput" disabled value={this.props.location.state.sale.client.name} type="text" required label="Nombre" />
        <TextField className="clientInput" disabled value={this.props.location.state.sale.client.address} type="text" required label="Domicilio" />
        <TextField className="clientInput" disabled value={this.props.location.state.sale.client.dni} type="number" required label="D.N.I." />
      </div>
    );
  }

  detailsBox() {
    return (
      <div className="detailsBox">
        <h3> Detalles</h3>
        <TextField multiline disabled value={this.props.location.state.sale.details} variant="outlined" label="¿Algun comentario o recordatorio?" className="detailsInput" />
      </div>
    );
  }

  sendBackButton() {
    return (
      <div className="container">
        <Fab className="sendSaleButton" variant="extended" onClick={() => this.back()}>
          <BackIcon />
          ATRAS
        </Fab>
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
    const saleItems = this.props.location.state.sale.items
      .map((i) => new SaleItem(i.product, i.amount));
    return saleItems.map(
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

  renderFooter() {
    return (
      <li className="list-group-item footer" key={0}>
        <div className="totalPrice">Total: ${this.props.location.state.sale.totalPrice}</div>
      </li>
    );
  }

  render() {
    return (
      <div>
        <Header category="Ver venta" />
        <hr />
        {this.clientBox()}{this.detailsBox()}
        <ul className="list-group list">
          {this.renderHeader()}
          {this.renderItems()}
          {this.renderFooter()}
        </ul>
        {this.sendBackButton()}
      </div>
    );
  }
}
