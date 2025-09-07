'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, MapPin, User, Phone, Mail, Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/contexts/auth-context'
import { formatPrice, maskPhone, maskCEP, maskCPF, isValidEmail, isValidCPF } from '@/lib/utils'

interface FormData {
  // Dados pessoais
  firstName: string
  lastName: string
  email: string
  phone: string
  cpf: string
  
  // Endereço
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  
  // Pagamento
  paymentMethod: 'credit' | 'debit' | 'pix' | 'boleto'
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  installments: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: 1,
  })

  const total = getTotal()
  const shipping = total >= 99 ? 0 : 9.99
  const finalTotal = total + shipping

  useEffect(() => {
    if (items.length === 0) {
      router.push('/')
    }
    
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout')
    }
  }, [items, router, isAuthenticated])

  // Preencher dados do usuário logado
  useEffect(() => {
    if (user && isAuthenticated) {
      const nameParts = user.name.split(' ')
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
      }))
    }
  }, [user, isAuthenticated])

  const handleInputChange = (field: keyof FormData, value: string) => {
    let maskedValue = value

    // Aplicar máscaras
    switch (field) {
      case 'phone':
        maskedValue = maskPhone(value)
        break
      case 'cep':
        maskedValue = maskCEP(value)
        break
      case 'cpf':
        maskedValue = maskCPF(value)
        break
      case 'cardNumber':
        maskedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
        break
      case 'expiryDate':
        maskedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/')
        break
      case 'cvv':
        maskedValue = value.replace(/\D/g, '').slice(0, 3)
        break
    }

    setFormData(prev => ({ ...prev, [field]: maskedValue }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Dados pessoais
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          isValidEmail(formData.email) &&
          formData.phone &&
          formData.cpf &&
          isValidCPF(formData.cpf)
        )
      case 2: // Endereço
        return !!(
          formData.cep &&
          formData.street &&
          formData.number &&
          formData.neighborhood &&
          formData.city &&
          formData.state
        )
      case 3: // Pagamento
        if (formData.paymentMethod === 'pix' || formData.paymentMethod === 'boleto') {
          return true
        }
        return !!(
          formData.cardNumber &&
          formData.cardName &&
          formData.expiryDate &&
          formData.cvv
        )
      default:
        return false
    }
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsProcessing(true)
    
    // Simular processamento do pagamento
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Limpar carrinho e redirecionar
    clearCart()
    router.push('/pedido-confirmado')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Carrinho vazio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Adicione produtos ao carrinho antes de finalizar a compra.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às compras
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às compras
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Finalizar Compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-400/20 via-blue-500/25 to-blue-600/30 backdrop-blur-3xl border border-blue-300/40 rounded-2xl shadow-2xl p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold backdrop-blur-sm ${
                        step <= currentStep
                          ? 'bg-blue-500/80 text-white border border-white/30'
                          : 'bg-white/20 text-gray-600 dark:text-gray-300 border border-white/20'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-16 h-1 mx-2 rounded-full ${
                          step < currentStep ? 'bg-blue-500/80' : 'bg-white/20'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Dados Pessoais */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-500/15 backdrop-blur-md rounded-lg flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Dados Pessoais
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sobrenome *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Seu sobrenome"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CPF *
                      </label>
                      <input
                        type="text"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Endereço */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-500/15 backdrop-blur-md rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Endereço de Entrega
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CEP *
                      </label>
                      <input
                        type="text"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="00000-000"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rua *
                      </label>
                      <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Nome da rua"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Número *
                      </label>
                      <input
                        type="text"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="123"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Complemento
                      </label>
                      <input
                        type="text"
                        value={formData.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Apartamento, casa, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bairro *
                      </label>
                      <input
                        type="text"
                        value={formData.neighborhood}
                        onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Nome do bairro"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Sua cidade"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Estado *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      >
                        <option value="">Selecione</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Pagamento */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-500/15 backdrop-blur-md rounded-lg flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Forma de Pagamento
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: 'credit', label: 'Cartão de Crédito', icon: '💳' },
                      { value: 'debit', label: 'Cartão de Débito', icon: '💳' },
                      { value: 'pix', label: 'PIX', icon: '⚡' },
                      { value: 'boleto', label: 'Boleto', icon: '📄' },
                    ].map((method) => (
                      <button
                        key={method.value}
                        onClick={() => handleInputChange('paymentMethod', method.value)}
                        className={`p-4 border-2 rounded-lg text-center transition-colors backdrop-blur-md ${
                          formData.paymentMethod === method.value
                            ? 'border-blue-600/80 bg-blue-500/25'
                            : 'border-white/50 bg-white/10 hover:border-white/70'
                        }`}
                      >
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="text-sm font-medium">{method.label}</div>
                      </button>
                    ))}
                  </div>

                  {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Número do Cartão *
                        </label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nome no Cartão *
                        </label>
                        <input
                          type="text"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="Nome como está no cartão"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Validade *
                          </label>
                          <input
                            type="text"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="MM/AA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="000"
                          />
                        </div>
                      </div>

                      {formData.paymentMethod === 'credit' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Parcelas
                          </label>
                          <select
                            value={formData.installments}
                            onChange={(e) => handleInputChange('installments', e.target.value)}
                            className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                              <option key={num} value={num}>
                                {num}x de {formatPrice(finalTotal / num)} sem juros
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  {formData.paymentMethod === 'pix' && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-800 dark:text-green-200 font-medium">
                          PIX - Aprovação instantânea
                        </span>
                      </div>
                      <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                        Você receberá o QR Code para pagamento após finalizar a compra.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === 'boleto' && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-blue-800 dark:text-blue-200 font-medium">
                          Boleto Bancário
                        </span>
                      </div>
                      <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                        O boleto será gerado após finalizar a compra e enviado por e-mail.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2 bg-white/15 backdrop-blur-md border border-white/50 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white/25 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Voltar
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!validateStep(currentStep)}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
                  >
                    Continuar
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!validateStep(3) || isProcessing}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center backdrop-blur-sm"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      'Finalizar Compra'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-400/20 via-blue-500/25 to-blue-600/30 backdrop-blur-3xl border border-blue-300/40 rounded-2xl shadow-2xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Resumo do Pedido
              </h3>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant?.value || 'default'}`} className="flex space-x-3 p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      {item.variant && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.variant.name}: {item.variant.value}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/30 pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span className="text-gray-900 dark:text-white">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Frete:</span>
                  <span className="text-gray-900 dark:text-white">
                    {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-white/30 pt-2">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-blue-600">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="mt-4 p-3 bg-blue-500/8 backdrop-blur-md border border-blue-500/40 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    💡 Adicione mais {formatPrice(99 - total)} para ganhar frete grátis!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
