import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import EditModal from './EditModal';
import '../../style/ProductList.css';
import API from '../../service/api';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    API.get('/allProducts')
      .then((res) => this.setState({ products: res }))
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
      <div className="row">
        <div className="buttonsCol col">
          <EditModal product={product} />
        </div>
        <div className="buttonsCol col">
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
        <li className={`list-group-item ${this.cssClass(product)}`}>
          <div className="row">
            <div className="col">{product.code}</div>
            <div className="col">{product.name}</div>
            <div className="col">{product.unitPrice}</div>
            <div className="col">{product.packagePrice}</div>
            <div className="col">{product.stock}</div>
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
          <div className="col">Precio por bulto</div>
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
    return <h3>Actualmente no dispone de productos</h3>;
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
