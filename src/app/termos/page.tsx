'use client';

import { motion } from 'framer-motion';
import { FileText, Scale, ShoppingCart, CreditCard, Truck, Shield } from 'lucide-react';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Termos de Uso
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
                <FileText className="w-6 h-6 text-blue-600" />
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ao acessar e usar o site da Michel Store, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deve usar nosso site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-green-600" />
                2. Produtos e Serviços
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nossos produtos e serviços são oferecidos conforme disponibilidade. Reservamo-nos o direito de:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Modificar ou descontinuar produtos a qualquer momento</li>
                <li>Corrigir erros de preços ou descrições</li>
                <li>Limitar quantidades de produtos por cliente</li>
                <li>Recusar pedidos por motivos justificados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-purple-600" />
                3. Preços e Pagamento
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Todos os preços estão em reais (R$) e incluem impostos aplicáveis. Aceitamos as seguintes formas de pagamento:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Cartões de crédito e débito</li>
                <li>PIX</li>
                <li>Boleto bancário</li>
                <li>Pagamento na entrega (regiões selecionadas)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Truck className="w-6 h-6 text-orange-600" />
                4. Entrega e Frete
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                As entregas são realizadas em todo o território nacional. Os prazos de entrega variam conforme a região:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Regiões metropolitanas: 2-3 dias úteis</li>
                <li>Interior: 3-5 dias úteis</li>
                <li>Regiões distantes: 5-7 dias úteis</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                O frete é calculado automaticamente no carrinho de compras. Oferecemos frete grátis para compras acima de R$ 199,00.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-600" />
                5. Troca e Devolução
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Você tem 7 dias corridos, a partir do recebimento do produto, para solicitar troca ou devolução. Os produtos devem estar:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Em perfeito estado de conservação</li>
                <li>Com todas as embalagens e acessórios originais</li>
                <li>Com a nota fiscal de compra</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Produtos personalizados, íntimos ou com defeito de fabricação têm políticas específicas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Responsabilidades do Cliente
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                O cliente se compromete a:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Fornecer informações verdadeiras e atualizadas</li>
                <li>Manter a confidencialidade de sua conta</li>
                <li>Usar o site de forma legal e ética</li>
                <li>Respeitar os direitos de propriedade intelectual</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Limitação de Responsabilidade
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                A Michel Store não se responsabiliza por danos indiretos, lucros cessantes ou outros prejuízos decorrentes do uso do site ou produtos, exceto nos casos previstos em lei.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Propriedade Intelectual
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Todo o conteúdo do site, incluindo textos, imagens, logotipos e design, é propriedade da Michel Store e está protegido por leis de direitos autorais.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Modificações dos Termos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Contato
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Para dúvidas sobre estes termos, entre em contato conosco através do e-mail: legal@michelstore.com.br
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
