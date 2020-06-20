import React from 'react';
import AddStockModal from '../Stock/AddStockModal';
import AddModal from './AddModal';
import NavBar from '../NavBar';
import '../../style/ProductHeader.css';

class ProductHeader extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="Row">
          <div className="Column">
            <h1 className="product Column">Productos</h1>
          </div>
          <div className="Column" />
          <div className="Row">
            <div className="Column">
              <AddStockModal />
            </div>
            <div className="Column">
              <AddModal />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductHeader;
