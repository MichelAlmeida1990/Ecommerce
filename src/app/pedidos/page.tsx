'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowLeft, Calendar, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PedidosPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/pedidos');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Dados mockados de pedidos
  const pedidos = [
    {
      id: 'PED-001',
      data: '2024-01-15',
      status: 'Entregue',
      total: 'R$ 299,90',
      itens: 2,
      endereco: 'Rua das Flores, 123 - São Paulo, SP'
    },
    {
      id: 'PED-002',
      data: '2024-01-10',
      status: 'Em trânsito',
      total: 'R$ 159,90',
      itens: 1,
      endereco: 'Rua das Flores, 123 - São Paulo, SP'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue':
        return 'bg-green-100 text-green-800';
      case 'Em trânsito':
        return 'bg-blue-100 text-blue-800';
      case 'Processando':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center mr-4">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Meus Pedidos
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Acompanhe seus pedidos e histórico de compras
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pedidos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {pedidos.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nenhum pedido encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Você ainda não fez nenhum pedido. Que tal começar a comprar?
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Começar a comprar
              </Link>
            </div>
          ) : (
            pedidos.map((pedido, index) => (
              <motion.div
                key={pedido.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Pedido #{pedido.id}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {pedido.itens} {pedido.itens === 1 ? 'item' : 'itens'}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pedido.status)}`}>
                      {pedido.status}
                    </span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      {pedido.total}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(pedido.data).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {pedido.endereco}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Ver detalhes do pedido
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
