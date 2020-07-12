import React from 'react';
import NavBar from '../NavBar';
import '../../style/Header.css';

class Header extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="header-container">
          <h1 className="category ">{this.props.category}</h1>
          <div className="button1">
            {this.props.button1}
          </div>
          <div className="button2">
            {this.props.button2}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
