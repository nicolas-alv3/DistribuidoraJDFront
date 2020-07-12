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

export { onlyNumbers, unparsePesos, parsePesos };
