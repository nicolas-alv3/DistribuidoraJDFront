import React from 'react';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import SeeIcon from '@material-ui/icons/Visibility';
import EmptyIcon from '@material-ui/icons/NoteAddOutlined';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import Pages from '../Pages';
import '../../style/ProductList.css';
import '../../style/Pagination.css';
import API from '../../service/api';
import { parsePesos } from '../../utils/utils';

class SalesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      page: 0,
      totalPages: 0,
      arePagesVisible: false,
    };
  }

  componentDidMount() {
    API.get(`/sale/all/${this.state.page}`)
      .then((res) => this.setState({ sales: res.content, arePagesVisible: res.totalPages === '1' }))
      .catch((e) => console.log(e));
  }

  handleChangePage(value) {
    API.get(`/sale/all/${value - 1}`)
      .then((res) => this.setState(
        { sales: res.content, totalPages: res.totalPages, page: res.pageable.pageNumber },
      ))
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
    return this.state.sales.map(
      (sale) => (
        <li className="list-group-item">
          <div className="row">
            <div className="col">{sale.id}</div>
            <div className="col">{sale.client.name || 'Sin nombre'}</div>
            <div className="col">{sale.date}</div>
            <div className="col">{sale.amountOfProducts}</div>
            <div className="col">{parsePesos(sale.totalPrice.toString())}</div>
            <div className="col">{this.buttons(sale)}</div>
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
          <div className="col">Cliente</div>
          <div className="col">Fecha</div>
          <div className="col">Cant. Productos</div>
          <div className="col">Monto total</div>
          <div className="col" />
        </div>
      </li>
    );
  }

  renderList() {
    if (this.state.sales.length > 0) {
      return <div>{this.listHeader()}{this.mapsales()}</div>;
    }
    return (
      <div>
        <h3 className="emptyList">
          No tienes ventas registradas, ¿Empezamos?
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
        <Pages page={this.state.page + 1} onChange={(value) => this.handleChangePage(value)} count={this.state.totalPages} color="primary" visible={this.state.arePagesVisible} />
      </div>
    );
  }
}

export default withRouter(SalesList);
