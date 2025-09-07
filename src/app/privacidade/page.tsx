'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, FileText } from 'lucide-react';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none dark:prose-invert"
          >
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600" />
                1. Informações que Coletamos
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Coletamos informações que você nos fornece diretamente, como quando você:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Cria uma conta em nosso site</li>
                <li>Faz uma compra</li>
                <li>Entra em contato conosco</li>
                <li>Participa de promoções ou pesquisas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-green-600" />
                2. Como Usamos suas Informações
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Processar e entregar seus pedidos</li>
                <li>Comunicar sobre seu pedido e conta</li>
                <li>Melhorar nossos produtos e serviços</li>
                <li>Enviar ofertas e promoções (com seu consentimento)</li>
                <li>Prevenir fraudes e garantir a segurança</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-red-600" />
                3. Proteção de Dados
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-purple-600" />
                4. Seus Direitos
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Você tem o direito de:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir informações incorretas</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Retirar seu consentimento a qualquer momento</li>
                <li>Portabilidade dos dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-orange-600" />
                5. Cookies e Tecnologias Similares
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do site e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Alterações nesta Política
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através do nosso site ou por e-mail.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Contato
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do e-mail: privacidade@michelstore.com.br
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
