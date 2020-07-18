import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EmptyIcon from '@material-ui/icons/NoteAddOutlined';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import EditModal from './EditModal';
import ShowModal from './ShowModal';
import '../../style/ProductList.css';
import API from '../../service/api';
import { parsePesos } from '../../utils/utils';
import Pages from '../Pages';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      page: 0,
      totalPages: 0,
    };
  }

  componentDidMount() {
    API.get(`/product/all/${this.state.page}`)
      .then((res) => this.setState({ products: res.content, totalPages: res.totalPages }))
      .catch((e) => console.log(e));
  }

  handleChangePage(value) {
    API.get(`/product/all/${value - 1}`)
      .then((res) => this.setState({
        products: res.content,
        totalPages: res.totalPages,
        page: res.pageable.pageNumber,
      }))
      .catch((e) => console.log(e));
  }

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
      <div className="buttons-container">
        <div className="item-button-show">
          <ShowModal product={product} />
        </div>
        <div className="item-button-edit">
          <EditModal product={product} />
        </div>
        <div className="item-button-delete">
          <Button className="buttons" color="primary" aria-label="add" onClick={() => this.delete(product)}>
            <DeleteIcon style={{ color: 'red' }} />
          </Button>
        </div>
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
    return this.state.products.map(
      (product) => (
        <li key={product.code} className={`list-group-item ${this.cssClass(product)}`}>
          <div className="row">
            <div className="col">{product.code}</div>
            <div className="col">{product.name}</div>
            <div className="col">{parsePesos(product.unitPrice.toString())}</div>
            <div className="col">{product.packageDiscount}%</div>
            <div className="col">{product.stock}u.</div>
            <div className="col">{this.buttons(product)}</div>
          </div>
        </li>
      ),
    );
  }

  listHeader() {
    return (
      <li className="list-group-item list-group-item-secondary">
        <div className="row">
          <div className="col">Código</div>
          <div className="col">Nombre</div>
          <div className="col">Precio unitario</div>
          <div className="col">Desc. mayorista</div>
          <div className="col">Stock</div>
          <div className="col" />
        </div>
      </li>
    );
  }

  renderList() {
    if (this.state.products.length > 0) {
      return <div>{this.listHeader()}{this.mapProducts()}</div>;
    }
    return (
      <div>
        <h3 className="emptyList">
          No tienes productos registrados, ¿Empezamos?
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
        <ul className="list list-group">
          {this.renderList()}
        </ul>
        <Pages page={this.state.page + 1} onChange={(value) => this.handleChangePage(value)} count={this.state.totalPages} color="primary" />
      </div>
    );
  }
}
