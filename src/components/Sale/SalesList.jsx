import React from 'react';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import SeeIcon from '@material-ui/icons/Visibility';
import EmptyIcon from '@material-ui/icons/NoteAddOutlined';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Swal from 'sweetalert2';
import '../../style/ProductList.css';
import '../../style/Pagination.css';
import API from '../../service/api';
import { parsePesos } from '../../utils/utils';

class SalesList extends React.Component {
  deleteSuccess() {
    Swal.fire(
      'Eliminado!',
      'Producto correctamente eliminado',
      'success',
    );
    window.location.reload();
  }

  delete(sale) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#58ACFA',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        API.post(`/sale/delete/${sale.id}`)
          .then(() => this.deleteSuccess())
          .catch((e) => console.log(e));
      }
    });
  }

  pushToSee(sale) {
    this.props.history.push({
      pathname: '/seeSale',
      state: {
        sale,
      },
    });
  }

  buttons(sale) {
    return (
      <div className="row">
        <div className="buttonsCol col">
          <Button className="buttons" color="primary" aria-label="add" onClick={() => this.delete(sale)}>
            <DeleteIcon style={{ color: 'red' }} />
          </Button>
          <Button className="buttons" color="primary" aria-label="add" onClick={() => this.pushToSee(sale)}>
            <SeeIcon style={{ color: 'lightblue' }} />
          </Button>
        </div>
      </div>
    );
  }

  mapsales() {
    return (
      <TableBody>{this.props.sales.map(
        (sale) => (
          <TableRow>
            <TableCell>{sale.id}</TableCell>
            <TableCell>{sale.client.name || 'Sin nombre'}</TableCell>
            <TableCell>{sale.date}</TableCell>
            <TableCell>{sale.amountOfProducts}</TableCell>
            <TableCell>{parsePesos(sale.totalPrice.toString())}</TableCell>
            <TableCell>{this.buttons(sale)}</TableCell>
          </TableRow>
        ),
      )}
      </TableBody>
    );
  }

  listHeader() {
    return (
      <TableHead>
        <TableRow style={{ backgroundColor: '#a3aff5' }}>
          <TableCell>Código</TableCell>
          <TableCell>Cliente</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Cant. Productos</TableCell>
          <TableCell>Monto total</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
    );
  }

  renderList() {
    if (this.props.sales !== undefined && this.props.sales.length > 0) {
      return <TableContainer><Table>{this.listHeader()}{this.mapsales()}</Table></TableContainer>;
    }
    return (
      <div>
        <h3 className="emptyList">
          {this.props.message}
        </h3>
        <div className="empty-container">
          <EmptyIcon className="emptyIcon" onClick={() => this.props.history.push('addSale')} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <ul className="list list-group">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default withRouter(SalesList);
