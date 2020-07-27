import React from 'react';
import jsreport from 'jsreport-browser-client-dist';

class Report extends React.Component {
  componentDidMount() {
    jsreport.serverUrl = 'http://localhost:5488';
    const reportRequest = {
      template: {
        shortid: 'rkJTnK2ce',
      },
      data: {
        number: '123',
        seller: {
          name: 'Next Step Webs, Inc.',
          road: '12345 Sunny Road',
          country: 'Sunnyville, TX 12345',
        },
        buyer: {
          name: 'Acme Corp.',
          road: '16 Johnson Road',
          country: 'Paris, France 8060',
        },
        items: [{
          name: 'Website design',
          price: 300,
        }],
      },
    };
    jsreport.render(this.reportPreview, reportRequest);
  }

  render() {
    return (
      <div
        style={{ height: '700px' }}
        ref={(el) => (this.reportPreview = el)}
      />
    );
  }
}

export default Report;
