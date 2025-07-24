'use client';

import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { loadProductById } = useProducts();
  const resolvedParams = use(params);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await loadProductById(resolvedParams.id);
        setProduct(response ?? null);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [loadProductById, resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Carregando produtos...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Produto não encontrado</div>
      </div>
    );
  }

  return (
    <div className="py-6 px-3">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/produtos"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
          >
            ← Voltar para produtos
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative h-96 md:h-full bg-gray-50 dark:bg-gray-700 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                  <span className="text-white font-semibold text-2xl">
                    Esgotado
                  </span>
                </div>
              )}
            </div>

            {/* Informações do produto */}
            <div className="p-8 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-800">
              <div className="h-full flex flex-col">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                    {product.name}
                  </h1>

                  {product.stock > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {product.stock} em estoque
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    Descrição
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    Especificações
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-300">
                        Código:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        #{product.id.toString().padStart(4, '0')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-300">
                        Disponibilidade:
                      </span>
                      <span
                        className={`font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                      >
                        {product.stock > 0 ? 'Em estoque' : 'Esgotado'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-300">
                        Quantidade:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {product.stock} unidades
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
