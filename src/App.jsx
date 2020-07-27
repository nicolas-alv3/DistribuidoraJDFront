/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Products from './components/Products/Products';
import Sales from './components/Sale/Sales';
import AddSale from './components/Sale/AddSale';
import SeeSale from './components/Sale/SeeSale';
import SearchResult from './components/SearchResult';
import Report from './components/Reporter';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Products {...props} />} />
        <Route exact path="/products" render={(props) => <Products {...props} />} />
        <Route exact path="/sales" render={(props) => <Sales {...props} />} />
        <Route exact path="/addSale" render={(props) => <AddSale {...props} />} />
        <Route exact path="/seeSale" render={(props) => <SeeSale {...props} />} />
        <Route exact path="/search" render={(props) => <SearchResult {...props} />} />
        <Route exact path="/report" render={(props) => <Report {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
