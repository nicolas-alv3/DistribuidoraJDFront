import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Products from './components/Products/Products';
import Sales from './components/Sale/Sales';
import AddSale from './components/Sale/AddSale';
import SeeSale from './components/Sale/SeeSale';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products" render={(props) => <Products {...props} />} />
        <Route exact path="/sales" render={(props) => <Sales {...props} />} />
        <Route exact path="/addSale" render={(props) => <AddSale {...props} />} />
        <Route exact path="/seeSale" render={(props) => <SeeSale {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
