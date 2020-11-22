import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EmptyIcon from '@material-ui/icons/NoteAddOutlined';
import {
  Button, Table, TableBody, TableCell, TableContainer, Container, TableHead, TableRow,
} from '@material-ui/core';
import Swal from 'sweetalert2';
import EditModal from './EditModal';
import ShowModal from './ShowModal';
import '../../style/ProductList.css';
import API from '../../service/api';
import { parsePesos } from '../../utils/utils';
import Category from './category.js';

export default class ProductList extends React.Component {
  deleteSuccess() {
    Swal.fire(
      'Eliminado!',
      'Producto correctamente eliminado',
      'success',
    );
    window.location.reload();
  }

  delete(product) {
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
        API.post(`/product/delete/${product.code}`)
          .then(() => this.deleteSuccess())
          .catch((e) => console.log(e));
      }
    });
  }

  buttons(product) {
    return (
      <div style={{ width: '200px', magin: 0, padding: 0 }}>
        <Button
          className="buttons"
          color="primary"
          aria-label="add"
          onClick={() => this.delete(product)}
        >
          <DeleteIcon style={{ color: 'red' }} />
        </Button>
        <ShowModal product={product} />
        <EditModal product={product} />
      </div>
    );
  }

  cssClass(product) {
    if (product.stock === 0) {
      return 'list-group-item-light';
    }
    if (product.stock < 10) {
      return 'list-group-item-warning';
    }
    return '';
  }

  mapProducts() {
    return (
      <TableBody> {this.props.products.map(
        (product) => (
          <TableRow key={product.code}>
            <TableCell size="small">{product.code}</TableCell>
            <TableCell>
              {new Category(product.category).getIcon()}
              {product.name}
            </TableCell>
            <TableCell>{parsePesos(product.unitPrice.toString())}</TableCell>
            <TableCell>{product.packageDiscount}%</TableCell>
            <TableCell>{product.stock}u.</TableCell>
            <TableCell align="right">{this.buttons(product)}</TableCell>
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
          <TableCell size="small">Código</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Precio unitario</TableCell>
          <TableCell>Desc. mayorista</TableCell>
          <TableCell>Stock</TableCell>
          <TableCell size="medium" />
        </TableRow>
      </TableHead>
    );
  }

  renderList() {
    if (this.props.products.length > 0) {
      return (
        <TableContainer>
          <Table>{this.listHeader()}{this.mapProducts()}</Table>
        </TableContainer>
      );
    }
    return (
      <div>
        <h3 className="emptyList">
          {this.props.message}
        </h3>
        <div className="empty-container">
          <EmptyIcon className="emptyIcon" />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Container>
          {this.renderList()}
        </Container>
      </div>
    );
  }
}
