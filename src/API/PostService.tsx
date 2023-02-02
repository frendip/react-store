export default class PostService {
  static async getProducts(activeCategory: number) {
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const url = `https://63d78ad7afbba6b7c93f22b1.mockapi.io/products?${category}`;
    const response = await fetch(url);
    return await response.json();
  }
}
