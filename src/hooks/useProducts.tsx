import { getProducts } from '@/services/products';
import { Product } from '@/types/product';
import { useCallback } from 'react';

export const useProducts = () => {
  const loadProducts = useCallback(async () => {
    const response = await getProducts();
    return response.json() as Promise<Product[]>;
  }, []);

  const loadProductById = useCallback(async (id: string) => {
    const response = await getProducts();
    const products = (await response.json()) as Product[];
    const product = products.find((product) => product.id === parseInt(id));

    return product;
  }, []);

  return {
    loadProducts,
    loadProductById,
  };
};
