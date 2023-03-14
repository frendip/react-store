import React from 'react';

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

export interface IProductCart {
  id: number;
  image: string;
  title: string;
  memory: number;
  colour: string;
  price: number;
  category: number;
  rating: number;
  count: number;
}

export interface ISort {
  name: string;
  sortProperty: string;
  order: 'asc' | 'desc';
}

export interface ISearchContext {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
