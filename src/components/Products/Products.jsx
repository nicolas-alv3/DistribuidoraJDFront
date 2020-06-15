import React from 'react';
import ProductHeader from './ProductHeader';
import ProductList from './ProductList';

export default class Products extends React.Component{
    render(){
        return(
            <div>
                <ProductHeader />
                <ProductList />
            </div>
        );
    }
}