import React from 'react';
import '../style/Home.css';
import { Button, ButtonGroup } from '@material-ui/core';

export default function Home(props) {
  return (
    <div className="home-background">
      <div className="home-title-container">
        <h1 className="home-title">
          Distribuidora JD
        </h1>
      </div>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button variant="outlined" className="home-sales-button" onClick={() => props.history.push('/sales')}>Ventas</Button>
        <Button variant="outlined" className="home-product-button" onClick={() => props.history.push('/products')}>Productos</Button>
      </ButtonGroup>
      <div className="home-layer" />
    </div>
  );
}
