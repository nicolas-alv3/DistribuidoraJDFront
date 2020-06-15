import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProductHeader from './components/ProductHeader';

function App() {
  return (
    <BrowserRouter>
      <Switch>
         <Route exact path="/product" render={(props) => <ProductHeader {...props}/>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
