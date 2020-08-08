/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Products from './components/Products/Products';
import Sales from './components/Sale/Sales';
import AddSale from './components/Sale/AddSale';
import SeeSale from './components/Sale/SeeSale';
import SearchResult from './components/Search/SearchResult';
import Purchases from './components/Purchases/Purchases';
import Balance from './components/Balance/Balance';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products" render={(props) => <Products {...props} />} />
        <Route exact path="/sales" render={(props) => <Sales {...props} />} />
        <Route exact path="/addSale" render={(props) => <AddSale {...props} />} />
        <Route exact path="/seeSale" render={(props) => <SeeSale {...props} />} />
        <Route exact path="/search" render={(props) => <SearchResult {...props} />} />
        <Route exact path="/purchases" render={(props) => <Purchases {...props} />} />
        <Route exact path="/balance" render={(props) => <Balance {...props} />} />
        <Route exact path="/home" render={(props) => <Home {...props} />} />
        <Route path="/" render={(props) => <Home {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
