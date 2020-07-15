/* eslint-disable radix */
import React from 'react';
import TextField from '@material-ui/core/TextField';
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
        <TextField className="clientInput" disabled value={this.props.location.state.sale.client.name || 'Sin nombre'} type="text" required label="Nombre" />
        <TextField className="clientInput" disabled value={this.props.location.state.sale.client.address || 'Sin domicilio'} type="text" required label="Domicilio" />
        <TextField className="clientInput" disabled value={this.props.location.state.sale.client.dni || 'Sin DNI'} type="number" required label="D.N.I." />
      </div>
    );
  }

  detailsBox() {
    return (
      <div className="detailsBox">
        <h3> Detalles</h3>
        <TextField multiline disabled value={this.props.location.state.sale.details || 'Sin comentarios'} variant="outlined" label="¿Algun comentario o recordatorio?" className="detailsInput" />
      </div>
    );
  }

  sendBackButton() {
    return (
      <div className="button-container">
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
        <div className="row">
          <div className="add-sale-code-header">Código</div>
          <div className="add-sale-description-header">Descripción</div>
          <div className="add-sale-quantity-header">Cantidad</div>
          <div className="add-sale-package-discount-header">Bonificación</div>
          <div className="add-sale-unit-price-header">P. unitario</div>
          <div className="add-sale-total-price-header">Subtotal</div>
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
            <div className="add-sale-code-header">{item.getCode()}</div>
            <div className="add-sale-description-header">{item.getDescription()}</div>
            <div className="add-sale-quantity-header">{item.getTotalAmount()} u.</div>
            <div className="add-sale-package-discount-header">{item.getPackageDiscount()}%</div>
            <div className="add-sale-unit-price-header">{parsePesos(item.getUnitPrice().toString())}</div>
            <div className="add-sale-total-price-header">{parsePesos(item.getTotalPrice().toString())}</div>
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
