/* eslint-disable no-param-reassign */
import jsreport from 'jsreport-browser-client-dist';
import { formatDate } from '../utils/utils';

function pad(n, width, z) {
  // // pad(10, 4);      // 0010
  // // pad(9, 4);       // 0009
  // // pad(123, 4);     // 0123
  // pad(10, 4, '-'); // --10

  z = z || '0';
  n = `${n}`;
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getData(sale, cigars) {
  return {
    client: {
      name: sale.client.name,
      address: sale.client.address,
      dni: sale.client.dni,
      details: sale.details,
    },
    items: sale.items.map((i) => ({
      description: i.product.name,
      amount: i.amount,
      discount: i.amount >= i.product.amountForDiscount ? i.product.packageDiscount : 0,
      unitPrice: i.product.unitPrice,
      subTotal: i.price,
    })),
    cigarQuantity: cigars,
    totalPrice: sale.totalPrice,
    date: formatDate(sale.date),
    billNumber: pad(sale.id, 8).toString(),
  };
}

function report(sale, cigarQuantity) {
  jsreport.serverUrl = 'http://localhost:5488';
  const reportRequest = {
    template: {
      shortid: 'SklM5ro2lP',
    },
    options: { reportName: `Venta ${new Date().getHours()}:${new Date().getMinutes()} ` },
    data: getData(sale, cigarQuantity),
  };
  jsreport.render('_blank', reportRequest);
}

// const example = {
//   client: {
//     name: 'Nico',
//     address: 'Kuffer 815',
//     dni: '40234015',
//     details: 'Me debe 5 pesos',
//   },
//   items: [
//     {
//       description: 'Pitusas', amount: 10, unitPrice: 10.5, subTotal: 50,
//     },
//   ],
//   cigarQuantity: 50,
//   totalPrice: sale.totalPrice,
//   date: '25/12/2020',
//   time: '14:40',
//   billNumber: '00000001',
// };

export default report;
