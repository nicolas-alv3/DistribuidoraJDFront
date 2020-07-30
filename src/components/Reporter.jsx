import React from 'react';
import jsreport from 'jsreport-browser-client-dist';

class Report extends React.Component {
  componentDidMount() {
    jsreport.serverUrl = 'http://localhost:5488';
    const reportRequest = {
      template: {
        shortid: 'SklM5ro2lP',
      },
      data: { },
    };
    jsreport.render('_blank', reportRequest);
  }

  render() {
    return (
      <div
        style={{ height: '700px' }}
      />
    );
  }
}

export default Report;
