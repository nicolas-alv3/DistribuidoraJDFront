export default class SaleItem {
  constructor(prod, amount) {
    this.product = prod;
    this.unitQuantity = amount;
    this.packageQuantity = 0;
  }

  setByUnit(n) {
    this.unitQuantity = n;
  }

  setByPackage(n) {
    this.packageQuantity = n;
  }

  getTotalAmount() {
    return (this.packageQuantity * this.product.amountPerPackage) + this.unitQuantity;
  }

  getTotalPrice() {
    if (this.getTotalAmount() >= this.product.amountForDiscount) {
      return (this.getTotalAmount()
      * this.product.unitPrice) - (this.getTotalAmount()
       * this.product.unitPrice) * (this.product.packageDiscount / 100);
    }
    return (this.getTotalAmount() * this.product.unitPrice);
  }

  getAmountPerPackage() {
    return this.product.amountPerPackage;
  }

  getDiscount() {
    return this.product.packageDiscount || '';
  }

  getUnitPrice() {
    return this.product.unitPrice;
  }

  getPackageDiscount() {
    return this.product.packageDiscount;
  }

  getCode() {
    return this.product.code;
  }

  getDescription() {
    return this.product.name;
  }

  getDTO() {
    return { code: this.product.code, amount: this.getTotalAmount() };
  }

  isError() {
    return this.getTotalAmount() > this.product.stock;
  }
}
