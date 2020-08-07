/* eslint-disable radix */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import BackIcon from '@material-ui/icons/ArrowBack';
import PDFIcon from '@material-ui/icons/PictureAsPdf';
import { Fab } from '@material-ui/core';
import Header from '../Header';
import '../../style/AddSale.css';
import { parsePesos, formatDate } from '../../utils/utils.js';
import report from '../../service/reporter.js';
import SaleItem from './SaleItem';

export default class SeeSale extends React.Component {
  getCigarQuantity(item) {
    if (item.product.category === 'CIGARRILLOS') {
      return item.amount;
    }
    return 0;
  }

  viewReport() {
    const cigarQuantity = this.props.location.state.sale.items
      .reduce((ac, i) => ac + this.getCigarQuantity(i), 0);
      //console.log(this.props.location.state.sale.items)
    report(this.props.location.state.sale, cigarQuantity);
  }

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

  buttons() {
    return (
      <div className="button-container-seeSale">
        <Fab className="backSaleButton" variant="extended" onClick={() => this.back()}>
          <BackIcon />
          ATRAS
        </Fab>
        <Fab className="sendPDFButton" variant="extended" onClick={() => this.viewReport()}>
          <PDFIcon />
          VER COMPROBANTE
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
        <Header category="Ver venta" button2={<p className="seeSale-date">{formatDate(this.props.location.state.sale.date)}</p>} />
        {this.clientBox()}{this.detailsBox()}
        <ul className="list-group list">
          {this.renderHeader()}
          {this.renderItems()}
          {this.renderFooter()}
        </ul>
        {this.buttons()}
      </div>
    );
  }
}
