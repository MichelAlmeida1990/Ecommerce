import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    empresa: [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Carreiras', href: '/carreiras' },
    ],
    produtos: [
      { name: 'Eletrônicos', href: '/categorias/eletronicos' },
      { name: 'Moda', href: '/categorias/moda' },
      { name: 'Casa e Jardim', href: '/categorias/casa-jardim' },
      { name: 'Esportes', href: '/categorias/esportes' },
    ],
    suporte: [
      { name: 'Central de Ajuda', href: '/ajuda' },
      { name: 'Trocas e Devoluções', href: '/ajuda/trocas-devolucoes' },
      { name: 'Política de Privacidade', href: '/privacidade' },
      { name: 'Termos de Uso', href: '/termos' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: '/redes-sociais/facebook', icon: Facebook },
    { name: 'Instagram', href: '/redes-sociais/instagram', icon: Instagram },
  ]

  return (
    <footer className="bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-blue-50/80 dark:from-blue-900/80 dark:via-purple-900/80 dark:to-blue-900/80 border-t border-blue-200/30 dark:border-blue-500/20">
      <div className="container-responsive py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400/80 to-purple-500/80 dark:from-blue-500 dark:to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-display text-2xl font-bold text-gray-800 dark:text-white">
                E-commerce Top
              </span>
            </Link>
            <p className="text-gray-600 dark:text-blue-100 mb-6 max-w-md leading-relaxed">
              Sua loja online completa com produtos de qualidade, preços competitivos 
              e o melhor atendimento. Transformamos a experiência de compra online.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-blue-200">
                <div className="w-8 h-8 rounded-lg bg-blue-200/50 dark:bg-blue-500/20 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <span>Av. Paulista, 1000 - São Paulo, SP</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-blue-200">
                <div className="w-8 h-8 rounded-lg bg-purple-200/50 dark:bg-purple-500/20 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                </div>
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-blue-200">
                <div className="w-8 h-8 rounded-lg bg-blue-200/50 dark:bg-blue-500/20 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <span>contato@ecommerce.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-8">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-200/60 to-purple-200/60 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm border border-blue-300/40 dark:border-blue-400/30 flex items-center justify-center text-blue-600 dark:text-blue-200 hover:from-blue-300/80 hover:to-purple-300/80 dark:hover:from-blue-500/30 dark:hover:to-purple-500/30 hover:text-blue-800 dark:hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-6 text-lg">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-blue-200 hover:text-gray-800 dark:hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-3 group-hover:bg-blue-600 dark:group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-6 text-lg">Produtos</h3>
            <ul className="space-y-3">
              {footerLinks.produtos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-blue-200 hover:text-gray-800 dark:hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-purple-500 dark:bg-purple-400 rounded-full mr-3 group-hover:bg-purple-600 dark:group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-6 text-lg">Suporte</h3>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-blue-200 hover:text-gray-800 dark:hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-3 group-hover:bg-blue-600 dark:group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-200/40 dark:border-blue-500/20 bg-gradient-to-r from-blue-100/60 to-purple-100/60 dark:from-blue-900/50 dark:to-purple-900/50">
        <div className="container-responsive py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-blue-200">
              © {currentYear} E-commerce Top. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
              <Link href="/privacidade" className="text-gray-600 dark:text-blue-200 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 hover:underline">
                Privacidade
              </Link>
              <Link href="/termos" className="text-gray-600 dark:text-blue-200 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 hover:underline">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}