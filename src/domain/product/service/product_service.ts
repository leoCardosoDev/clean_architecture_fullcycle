import Product from "../entity/product";

export default class ProductService {
  static increasePrice(products: Product[], percetage: number): Product[] {
    products.forEach(product => {
      product.changePrice((product.price * percetage) / 100 + product.price);
    });
    return products;
  }
}
