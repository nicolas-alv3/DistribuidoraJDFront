import React from 'react';
import NavBar from '../NavBar';
import '../../style/Header.css';

class Header extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="Row">
          <div className="Column">
            <h1 className="category Column">{this.props.category}</h1>
          </div>
          <div className="Column" />
          <div className="Row">
            <div className="Column">
              {this.props.button1}
            </div>
            <div className="Column">
              <div className="add">
                {this.props.button2}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
