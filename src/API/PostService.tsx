export default class PostService {
  static async getProducts(
    activePage: number,
    limit: number,
    activeCategory: number,
    activeSort: string,
    activeSortOrder: 'asc' | 'desc',
  ) {
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const url = `https://63d78ad7afbba6b7c93f22b1.mockapi.io/products?page=${activePage}&limit=${limit}&${category}&sortBy=${activeSort}&order=${activeSortOrder}`;
    const response = await fetch(url);
    return await response.json();
  }

  static async getProductsCount(activeCategory: number) {
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const url = `https://63d78ad7afbba6b7c93f22b1.mockapi.io/products?${category}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.length;
  }
}
