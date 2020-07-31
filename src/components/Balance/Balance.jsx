/* eslint-disable no-console */
import React from 'react';
import WorkingIcon from '@material-ui/icons/Settings';
import '../../style/Purchases.css';
import Header from '../Header';

export default class Balance extends React.Component {
  render() {
    return (
      <div>
        <Header category="Balances" />
        <div>
          <h3 className="emptyList">
            ¡En construccion! Estará disponible pronto...
          </h3>
          <div className="spinner-container">
            <WorkingIcon className="spinner purchases-settings-l" />
            <WorkingIcon className="spinner-l purchases-settings-r" />
          </div>
        </div>
      </div>
    );
  }
}
