export interface IProduct {
  id: number;
  image: string;
  title: string;
  memory: number[];
  colours: string[];
  price: number;
  category: number;
  rating: number;
}

export interface ISort {
  name: string;
  sortProperty: string;
  order: 'asc' | 'desc';
}
