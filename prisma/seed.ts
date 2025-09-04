import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar banco existente
  await prisma.$transaction([
    prisma.orderItem.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.order.deleteMany(),
    prisma.address.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.wishlistItem.deleteMany(),
    prisma.review.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.productVariant.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.newsletter.deleteMany(),
    prisma.coupon.deleteMany(),
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.user.deleteMany(),
  ])

  console.log('🧹 Banco limpo com sucesso')

  // Criar usuário admin
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@ecommerce.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Criar usuário teste
  const userPassword = await hash('user123', 12)
  const user = await prisma.user.create({
    data: {
      name: 'Usuário Teste',
      email: 'user@ecommerce.com',
      password: userPassword,
      role: 'USER',
    },
  })

  console.log('👥 Usuários criados')

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Eletrônicos',
        slug: 'eletronicos',
        description: 'Produtos eletrônicos de última geração',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Moda',
        slug: 'moda',
        description: 'Roupas e acessórios da moda',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Casa e Jardim',
        slug: 'casa-jardim',
        description: 'Produtos para casa e jardim',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Esportes',
        slug: 'esportes',
        description: 'Equipamentos e roupas esportivas',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      },
    }),
  ])

  console.log('📂 Categorias criadas')

  // Criar tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: 'Novo',
        slug: 'novo',
        color: '#00afee',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Promoção',
        slug: 'promocao',
        color: '#ca00ca',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Mais Vendido',
        slug: 'mais-vendido',
        color: '#ccff00',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Frete Grátis',
        slug: 'frete-gratis',
        color: '#c2af00',
      },
    }),
  ])

  console.log('🏷️ Tags criadas')

  // Criar produtos
  const products = await Promise.all([
    // Smartphone
    prisma.product.create({
      data: {
        name: 'Smartphone Galaxy Pro',
        slug: 'smartphone-galaxy-pro',
        description: 'Smartphone de última geração com câmera de 108MP, processador Snapdragon 8 Gen 2 e tela AMOLED de 6.7".',
        shortDescription: 'Smartphone premium com câmera de 108MP',
        price: 2999.99,
        comparePrice: 3499.99,
        stock: 50,
        isFeatured: true,
        isNew: true,
        categoryId: categories[0].id,
        tags: {
          connect: [tags[0].id, tags[1].id, tags[2].id],
        },
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
              alt: 'Smartphone Galaxy Pro',
              isPrimary: true,
              order: 0,
            },
            {
              url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
              alt: 'Smartphone Galaxy Pro - Vista lateral',
              isPrimary: false,
              order: 1,
            },
          ],
        },
        variants: {
          create: [
            {
              name: 'Cor',
              value: 'Preto',
              stock: 25,
            },
            {
              name: 'Cor',
              value: 'Azul',
              stock: 25,
            },
          ],
        },
      },
    }),

    // Notebook
    prisma.product.create({
      data: {
        name: 'Notebook Ultra Book',
        slug: 'notebook-ultra-book',
        description: 'Notebook ultra fino com processador Intel i7, 16GB RAM, SSD 512GB e tela de 14" Full HD.',
        shortDescription: 'Notebook ultra fino e potente',
        price: 4599.99,
        comparePrice: 5299.99,
        stock: 30,
        isFeatured: true,
        categoryId: categories[0].id,
        tags: {
          connect: [tags[1].id, tags[2].id],
        },
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop',
              alt: 'Notebook Ultra Book',
              isPrimary: true,
              order: 0,
            },
          ],
        },
      },
    }),

    // Camiseta
    prisma.product.create({
      data: {
        name: 'Camiseta Básica Premium',
        slug: 'camiseta-basica-premium',
        description: 'Camiseta 100% algodão orgânico, com corte moderno e confortável para uso diário.',
        shortDescription: 'Camiseta básica de algodão orgânico',
        price: 89.99,
        comparePrice: 119.99,
        stock: 100,
        categoryId: categories[1].id,
        tags: {
          connect: [tags[1].id, tags[3].id],
        },
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
              alt: 'Camiseta Básica Premium',
              isPrimary: true,
              order: 0,
            },
          ],
        },
        variants: {
          create: [
            { name: 'Tamanho', value: 'P', stock: 25 },
            { name: 'Tamanho', value: 'M', stock: 25 },
            { name: 'Tamanho', value: 'G', stock: 25 },
            { name: 'Tamanho', value: 'GG', stock: 25 },
          ],
        },
      },
    }),

    // Tênis
    prisma.product.create({
      data: {
        name: 'Tênis Esportivo Runner',
        slug: 'tenis-esportivo-runner',
        description: 'Tênis esportivo com tecnologia de amortecimento avançada, ideal para corridas e atividades físicas.',
        shortDescription: 'Tênis esportivo com amortecimento avançado',
        price: 299.99,
        comparePrice: 399.99,
        stock: 75,
        categoryId: categories[3].id,
        tags: {
          connect: [tags[1].id, tags[2].id],
        },
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
              alt: 'Tênis Esportivo Runner',
              isPrimary: true,
              order: 0,
            },
          ],
        },
        variants: {
          create: [
            { name: 'Tamanho', value: '36', stock: 15 },
            { name: 'Tamanho', value: '37', stock: 15 },
            { name: 'Tamanho', value: '38', stock: 15 },
            { name: 'Tamanho', value: '39', stock: 15 },
            { name: 'Tamanho', value: '40', stock: 15 },
          ],
        },
      },
    }),

    // Fone de Ouvido
    prisma.product.create({
      data: {
        name: 'Fone Bluetooth Premium',
        slug: 'fone-bluetooth-premium',
        description: 'Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de longa duração e som de alta qualidade.',
        shortDescription: 'Fone Bluetooth com cancelamento de ruído',
        price: 599.99,
        comparePrice: 799.99,
        stock: 40,
        isNew: true,
        categoryId: categories[0].id,
        tags: {
          connect: [tags[0].id, tags[1].id],
        },
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
              alt: 'Fone Bluetooth Premium',
              isPrimary: true,
              order: 0,
            },
          ],
        },
      },
    }),
  ])

  console.log('📱 Produtos criados')

  // Criar endereços para o usuário
  const addresses = await Promise.all([
    prisma.address.create({
      data: {
        type: 'BOTH',
        firstName: 'João',
        lastName: 'Silva',
        address1: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '01234-567',
        country: 'Brasil',
        phone: '(11) 99999-9999',
        isDefault: true,
        userId: user.id,
      },
    }),
    prisma.address.create({
      data: {
        type: 'SHIPPING',
        firstName: 'João',
        lastName: 'Silva',
        address1: 'Av. Paulista, 1000',
        address2: 'Apto 45',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '01310-100',
        country: 'Brasil',
        phone: '(11) 88888-8888',
        isDefault: false,
        userId: user.id,
      },
    }),
  ])

  console.log('🏠 Endereços criados')

  // Criar cupom
  const coupon = await prisma.coupon.create({
    data: {
      code: 'PRIMEIRA10',
      type: 'PERCENTAGE',
      value: 10.0,
      minAmount: 100.0,
      maxUses: 1000,
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    },
  })

  console.log('🎫 Cupom criado')

  // Criar newsletter
  await prisma.newsletter.create({
    data: {
      email: 'teste@newsletter.com',
    },
  })

  console.log('📧 Newsletter criada')

  // Criar algumas avaliações
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Excelente produto!',
        comment: 'Superou todas as minhas expectativas. Recomendo muito!',
        userId: user.id,
        productId: products[0].id,
        isVerified: true,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Muito bom',
        comment: 'Produto de qualidade, entrega rápida.',
        userId: user.id,
        productId: products[1].id,
        isVerified: true,
      },
    }),
  ])

  console.log('⭐ Avaliações criadas')

  // Adicionar produtos ao carrinho do usuário
  await Promise.all([
    prisma.cartItem.create({
      data: {
        userId: user.id,
        productId: products[0].id,
        quantity: 1,
      },
    }),
    prisma.cartItem.create({
      data: {
        userId: user.id,
        productId: products[2].id,
        quantity: 2,
      },
    }),
  ])

  console.log('🛒 Itens do carrinho criados')

  // Adicionar produtos à lista de desejos
  await prisma.wishlistItem.create({
    data: {
      userId: user.id,
      productId: products[3].id,
    },
  })

  console.log('❤️ Lista de desejos criada')

  console.log('✅ Seed concluído com sucesso!')
  console.log('')
  console.log('👤 Usuários criados:')
  console.log(`   Admin: admin@ecommerce.com / admin123`)
  console.log(`   User: user@ecommerce.com / user123`)
  console.log('')
  console.log('🎫 Cupom de desconto: PRIMEIRA10 (10% off)')
  console.log('')
  console.log('🌐 Acesse: http://localhost:3000')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

