import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EmptyIcon from '@material-ui/icons/NoteAddOutlined';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import EditModal from './EditModal';
import ShowModal from './ShowModal';
import '../../style/ProductList.css';
import API from '../../service/api';
import SodaIcon from '../../icons/soda.png';
import DrugsIcon from '../../icons/drugs.png';
import CigarIcon from '../../icons/cigar.png';
import CookieIcon from '../../icons/cookie.png';
import CandyIcon from '../../icons/candy.png';
import OtherIcon from '../../icons/question.png';
import { parsePesos } from '../../utils/utils';

export default class ProductList extends React.Component {
  getIcon(product) {
    let res = '';
    switch (product.category) {
      case 'GASEOSAS': res = SodaIcon; break;
      case 'ANALGESICOS': res = DrugsIcon; break;
      case 'CIGARRILLOS': res = CigarIcon; break;
      case 'GALLETITAS': res = CookieIcon; break;
      case 'GOLOSINAS': res = CandyIcon; break;
      default: res = OtherIcon; break;
    }
    return res;
  }

  deleteSuccess() {
    Swal.fire(
      'Eliminado!',
      'Producto correctamente eliminado',
      'success',
    );
    window.location.reload(false);
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
    return this.props.products.map(
      (product) => (
        <li key={product.code} className={`list-group-item ${this.cssClass(product)}`}>
          <div className="row">
            <div className="col">{product.code}</div>
            <div className="col">
              <img className="list-category-icon" src={this.getIcon(product)} alt="categoria" />
              {product.name}
            </div>
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
      <li key={-1} className="list-group-item list-group-item-secondary">
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
    if (this.props.products.length > 0) {
      return <div>{this.listHeader()}{this.mapProducts()}</div>;
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
        <ul className="list list-group">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}
