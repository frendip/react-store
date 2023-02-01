export default class PostService {
  static async getProducts() {
    const url = 'https://63d78ad7afbba6b7c93f22b1.mockapi.io/products';
    const response = await fetch(url);
    return await response.json();
  }
}
