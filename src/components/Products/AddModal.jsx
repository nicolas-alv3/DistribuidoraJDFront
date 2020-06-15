import React from 'react';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import Swal from 'sweetalert2';
import API from '../../service/api.js';
import '../../style/AddModal.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default class AddModal extends React.Component {
  state={
    open:false,
    name: "",
    code:"",
    unitPrice: "",
    packagePrice:"",
    amountPerPackage:""
}

openDialog() {
    this.setState({ open: true });
}

closeDialog() {
  this.setState({ open: false });
}

handleName(e){
  this.setState({name : e.target.value});
}

handleCode(e){
  this.setState({code : e.target.value});
}

handleUnitPrice(e){
  this.setState({unitPrice : e.target.value});
}

handlePackagePrice(e){
  this.setState({packagePrice : e.target.value});
}

handleAmount(e){
  this.setState({amountPerPackage : e.target.value});
}

productCreated(){
  console.log(this.props)
  Swal.fire(
    'Bien!',
    'Producto Creado',
    'success'
  )
}

error(e){
  Swal.fire(
    'Uy',
    'Hubo un error',
    'error'
  )
}

post(){
  this.closeDialog()
  const body = {
      name:this.state.name,
      code: this.state.code,
      unitPrice: this.state.unitPrice,
      packagePrice: this.state.packagePrice,
      amountPerPackage : this.amountPerPackage
  }
  API.post('/product', body)
.then(() => this.productCreated())
.catch((e) => this.error(e))
}

render() {
    return (
        <div >
            <div className="add" >
              <Fab color="primary" aria-label="add" onClick={this.openDialog.bind(this)}>
                <AddIcon />
              </Fab>
            </div>
            <Dialog open={this.state.open}>
                <DialogTitle>Agregar producto</DialogTitle>
                <form className="form" noValidate autoComplete="off">
                  <div className="Row">
                    <TextField className="nameField" required id="standard-name" label="Nombre" onChange={ (e)=> this.handleName(e)} />
                  </div>
                  <div className="Row">
                    <TextField className="textField" required id="standard-name" label="Codigo" onChange={ (e)=> this.handleCode(e)} />
                    <TextField className="textField" required id="standard-name" label="Precio unitario" onChange={ (e)=> this.handleUnitPrice(e)} />
                  </div>
                  <div className="Row">
                    <TextField className="textField" required id="standard-name" label="Precio por bulto" onChange={ (e)=> this.handlePackagePrice(e)} />
                    <TextField className="textField" required id="standard-name" label="Cantidad por bulto" onChange={ (e)=> this.handleAmount(e)} />
                  </div>
                  <div className="Row">
                  <div className="Column">
                  <Fab className="confirm" color="primary" aria-label="add" >
                    <CheckIcon onClick={this.post.bind(this)} />
                </Fab>
                </div>
                <div className="Column">
                <Fab className="confirm" color="primary" aria-label="add" >
                    <CancelIcon onClick={this.closeDialog.bind(this)} />
                </Fab>
                </div>
                  </div>
                </form>
            </Dialog>
        </div>
    );
}
}
