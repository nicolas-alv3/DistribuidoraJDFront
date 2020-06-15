import React from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import '../../style/ProductList.css'

export default class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            products : [
                {
                    "name":"Pitusa",
                    "code" : "0001",
                    "unitPrice": 3.4,
                    "packagePrice": 3.3,
                    "amountPerPackage": 30
                },
                {
                    "name":"Don satur",
                    "code" : "0003",
                    "unitPrice": 3.4,
                    "packagePrice": 3.3,
                    "amountPerPackage": 30
                },
                {
                    "name":"Pepitos",
                    "code" : "0001",
                    "unitPrice": 3.4,
                    "packagePrice": 3.3,
                    "amountPerPackage": 30
                }
            ]
        }
    }

    buttons(){
        return (
            <div className="row">
            <div className="buttonsCol col">
                <Button className="buttons" color="primary" aria-label="add" >
                    <VisibilityIcon />
                </Button>
            </div>
            <div className="buttonsCol col">
                <Button className="buttons" color="primary" aria-label="add" >
                    <EditIcon className=""/>
                </Button>
            </div>
            <div className="buttonsCol col">
                <Button className="buttons" color="primary" aria-label="add" >
                    <DeleteIcon className=""/>  
                </Button>
            </div>
            </div>
        );
    }

    mapProducts(){
        return this.state.products.map(
            (product)=> <li className="list-group-item"> 
            <div className="row">
                <div className="col">{product.code}</div>
                <div className="col">{product.name}</div>
                <div className="col">{product.unitPrice}</div>
                <div className="col">{product.packagePrice}</div>
                <div className="col">{this.buttons(product)}</div>
            </div>
            </li>
        );
    }

    listHeader(){
        return (
            <li className="list-group-item list-group-item-light">
            <div className="row">
                <div className="col">Código</div>
                <div className="col">Nombre</div>
                <div className="col">Precio unitario</div>
                <div className="col">Precio por bulto</div>
                <div className="col"></div>
            </div>
            </li>
        );
    }

    render(){
        return(
            <div>
            <ul className="list list-group">
                {this.listHeader()}
                {this.mapProducts()}
            </ul>
            </div>
        );
    }
}