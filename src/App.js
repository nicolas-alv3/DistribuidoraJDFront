import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Products from './components/Products/Products';

function App() {
  return (
    <BrowserRouter>
      <Switch>
         <Route exact path="/product" render={(props) => <Products {...props}/>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
