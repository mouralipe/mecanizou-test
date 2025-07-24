'use client';

import { Button } from '@/components/Button';
import { useProducts } from '@/hooks/useProducts';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
}

const PRODUCTS_PER_PAGE = 6;

export default function Produtos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { loadProducts } = useProducts();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await loadProducts();
        setProducts(response);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [loadProducts]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Carregando produtos...</div>
      </div>
    );
  }

  return (
    <div className="py-6 px-3">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Produtos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group hover:scale-[1.02] hover:border-gray-200 dark:hover:border-gray-600"
            >
              <div className="relative h-48 w-full bg-gray-50 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      Esgotado
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-800">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  {product.stock > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {product.stock} em estoque
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link href={`/produtos/${product.id}`}>
                  <Button disabled={product.stock === 0}>
                    {product.stock > 0 ? 'Ver detalhes' : 'Indisponível'}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
            >
              ‹ Anterior
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={currentPage === page ? 'default' : 'outline'}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Próximo ›
            </Button>
          </div>
        )}

        <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Mostrando {startIndex + 1} a {Math.min(endIndex, products.length)} de{' '}
          {products.length} produtos
        </div>
      </div>
    </div>
  );
}
