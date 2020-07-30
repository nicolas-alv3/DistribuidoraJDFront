function parsePesos(str) {
  // Requiere que el string este bien formado, Un solo $ y solo un punto
  if (str.length > 0 && str[0] !== '$') {
    return Number(str).toLocaleString('es-ar', { style: 'currency', currency: 'ARS' });
  }
  return str;
}

function unparsePesos(str) {
  return Number(str.substring(1, str.length).replace(',', '.'));
}

function onlyNumbers(str) {
  return /^\d+$/.test(str);
}

function formatDate(date) {
  // Format from YYYY-MM-DD to DD-MM-YYYY
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  return `${day}/${month}/${year}`;
}

export {
  onlyNumbers, unparsePesos, parsePesos, formatDate,
};
