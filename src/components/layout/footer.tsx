import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Truck, Shield, Clock } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    empresa: [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Nossa História', href: '/sobre#historia' },
      { name: 'Missão e Valores', href: '/sobre#missao' },
      { name: 'Carreiras', href: '/carreiras' },
      { name: 'Imprensa', href: '/imprensa' },
    ],
    produtos: [
      { name: 'Eletrônicos', href: '/categorias/eletronicos' },
      { name: 'Moda', href: '/categorias/moda' },
      { name: 'Casa e Jardim', href: '/categorias/casa-jardim' },
      { name: 'Esportes', href: '/categorias/esportes' },
      { name: 'Novidades', href: '/novidades' },
    ],
    suporte: [
      { name: 'Central de Ajuda', href: '/ajuda' },
      { name: 'Como Comprar', href: '/ajuda/como-comprar' },
      { name: 'Trocas e Devoluções', href: '/ajuda/trocas-devolucoes' },
      { name: 'Política de Privacidade', href: '/privacidade' },
      { name: 'Termos de Uso', href: '/termos' },
    ],
    contato: [
      { name: 'Fale Conosco', href: '/contato' },
      { name: 'SAC: 0800 123 4567', href: 'tel:08001234567' },
      { name: 'WhatsApp: (11) 99999-9999', href: 'https://wa.me/5511999999999' },
      { name: 'Email: contato@ecommerce.com', href: 'mailto:contato@ecommerce.com' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
  ]

  const features = [
    {
      icon: CreditCard,
      title: 'Pagamento Seguro',
      description: 'Múltiplas formas de pagamento com total segurança',
    },
    {
      icon: Truck,
      title: 'Entrega Rápida',
      description: 'Entrega em todo o Brasil com rastreamento',
    },
    {
      icon: Shield,
      title: 'Compra Garantida',
      description: '30 dias para troca ou devolução',
    },
    {
      icon: Clock,
      title: 'Suporte 24/7',
      description: 'Atendimento disponível a qualquer momento',
    },
  ]

  return (
    <footer className="bg-surface border-t border-border">
      {/* Features Section */}
      <section className="border-b border-border">
        <div className="container-responsive py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-display text-2xl font-bold text-white">
                E-commerce Top
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Sua loja online completa com produtos de qualidade, preços competitivos 
              e o melhor atendimento. Transformamos a experiência de compra online.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Av. Paulista, 1000 - São Paulo, SP</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contato@ecommerce.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Produtos</h3>
            <ul className="space-y-2">
              {footerLinks.produtos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Suporte</h3>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="border-t border-border bg-card">
        <div className="container-responsive py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Fique por dentro das novidades!
            </h3>
            <p className="text-muted-foreground mb-4">
              Cadastre-se para receber ofertas exclusivas e novidades em primeira mão.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="input flex-1"
              />
              <button className="btn btn-accent whitespace-nowrap">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <div className="border-t border-border bg-card">
        <div className="container-responsive py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} E-commerce Top. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/privacidade" className="hover:text-accent transition-colors">
                Privacidade
              </Link>
              <Link href="/termos" className="hover:text-accent transition-colors">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="hover:text-accent transition-colors">
                Cookies
              </Link>
            </div>

            <div className="text-sm text-muted-foreground">
              Desenvolvido com ❤️ no Brasil
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


