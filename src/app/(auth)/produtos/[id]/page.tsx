'use client';

import { useProducts } from '@/hooks/useProducts';
import { useTheme } from '@/hooks/useTheme';
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
  const { isDark } = useTheme();
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
        <div className="mb-6">
          <Link
            href="/produtos"
            className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors duration-200 text-sm`}
          >
            ← Voltar para produtos
          </Link>
        </div>

        <div
          className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-lg overflow-hidden border`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div
              className={`relative h-96 md:h-full ${isDark ? 'bg-gray-700' : 'bg-gray-50'} overflow-hidden`}
            >
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

              {product.stock === 0 && (
                <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                  <span className="text-white font-semibold text-2xl">
                    Esgotado
                  </span>
                </div>
              )}
            </div>

            <div className={`p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="h-full flex flex-col">
                <div className="mb-6">
                  <h1
                    className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}
                  >
                    {product.name}
                  </h1>

                  {product.stock > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span
                        className={`text-sm ${isDark ? 'text-green-400' : 'text-green-600'} font-medium`}
                      >
                        {product.stock} em estoque
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <span
                      className={`text-4xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                    >
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2
                    className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}
                  >
                    Descrição
                  </h2>
                  <p
                    className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
                  >
                    {product.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h2
                    className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}
                  >
                    Especificações
                  </h2>
                  <div className="space-y-2">
                    <div
                      className={`flex justify-between items-center py-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
                    >
                      <span
                        className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        Código:
                      </span>
                      <span
                        className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}
                      >
                        #{product.id.toString().padStart(4, '0')}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center py-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
                    >
                      <span
                        className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        Disponibilidade:
                      </span>
                      <span
                        className={`font-medium ${product.stock > 0 ? (isDark ? 'text-green-400' : 'text-green-600') : isDark ? 'text-red-400' : 'text-red-600'}`}
                      >
                        {product.stock > 0 ? 'Em estoque' : 'Esgotado'}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center py-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
                    >
                      <span
                        className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        Quantidade:
                      </span>
                      <span
                        className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}
                      >
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
