/* eslint-disable radix */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Container from '@material-ui/core/Container';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
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
      <TableHead key={-1} style={{ backgroundColor: '#a3aff5' }}>
        <TableRow>
          <TableCell>Código</TableCell>
          <TableCell>Descripción</TableCell>
          <TableCell>Cantidad</TableCell>
          <TableCell>Bonificación</TableCell>
          <TableCell>P. unitario</TableCell>
          <TableCell>Subtotal</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  renderItems() {
    const saleItems = this.props.location.state.sale.items
      .map((i) => new SaleItem(i.product, i.amount));
    return (
      <TableBody>{saleItems.map(
        (item) => (
          <TableRow key={item.getCode()}>
            <TableCell>{item.getCode()}</TableCell>
            <TableCell>{item.getDescription()}</TableCell>
            <TableCell>{item.getTotalAmount()} u.</TableCell>
            <TableCell>{item.getPackageDiscount()}%</TableCell>
            <TableCell>{parsePesos(item.getUnitPrice().toString())}</TableCell>
            <TableCell>{parsePesos(item.getTotalPrice().toString())}</TableCell>
          </TableRow>
        ),
      )}
      </TableBody>
    );
  }

  renderFooter() {
    return (
      <TableFooter key={0}>
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell><div style={{ fontSize: '25pt', color: 'green' }}>Total: ${this.props.location.state.sale.totalPrice}</div></TableCell>
        </TableRow>
      </TableFooter>
    );
  }

  render() {
    return (
      <div>
        <Header category="Ver venta" button2={<p className="seeSale-date">{formatDate(this.props.location.state.sale.date)}</p>} />
        {this.clientBox()}{this.detailsBox()}
        <Container style={{ margin: '30px 10px' }}>
          <TableContainer>
            <Table>
              {this.renderHeader()}
              {this.renderItems()}
            </Table>
            <div style={{
              float: 'right', marginRight: '80px', fontSize: '25pt', color: 'green', border: '1px solid gray', borderRadius: '10px', padding: '10px',
            }}
            >Total: ${this.props.location.state.sale.totalPrice}
            </div>
          </TableContainer>
        </Container>
        {this.buttons()}
      </div>
    );
  }
}
