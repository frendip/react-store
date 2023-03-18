// В данный момент бизнес логика реализуется через асинхронные экшены редакса, код остался для примера

export default class PostService {
  static async getProducts(
    activePage: number,
    limit: number,
    activeCategory: number,
    activeSort: string,
    activeSortOrder: 'asc' | 'desc',
    searchValue: string,
  ) {
    const category = activeCategory > 0 ? `&category=${activeCategory}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const url = `https://63d78ad7afbba6b7c93f22b1.mockapi.io/products?page=${activePage}&limit=${limit}${category}&sortBy=${activeSort}&order=${activeSortOrder}${search}`;
    const response = await fetch(url);
    return await response.json();
  }

  static async getProductById(id: string) {
    const url = `https://63d78ad7afbba6b7c93f22b1.mockapi.io/products/${id}`;
    const response = await fetch(url);
    return await response.json();
  }

  static async getProductsCount(activeCategory: number, searchValue: string) {
    const category = activeCategory > 0 ? `&category=${activeCategory}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const url = `https://63d78ad7afbba6b7c93f22b1.mockapi.io/products?${category}${search}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.length;
  }
}
