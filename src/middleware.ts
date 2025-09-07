import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  const securityHeaders = {
    // Previne clickjacking
    'X-Frame-Options': 'DENY',

    // Previne MIME type sniffing
    'X-Content-Type-Options': 'nosniff',

    // Habilita XSS protection
    'X-XSS-Protection': '1; mode=block',

    // Controla referrer information
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://apis.google.com https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com https://fonts.cdnfonts.com",
      "connect-src 'self' https://accounts.google.com https://www.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firestore.googleapis.com",
      "frame-src 'self' https://accounts.google.com https://ecommerce-top-a8629.firebaseapp.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; '),

    // Permissions Policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
    ].join(', '),

    // Cross-Origin-Opener-Policy para Google Auth
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',

    // Strict Transport Security (apenas em HTTPS)
    ...(request.nextUrl.protocol === 'https:' && {
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',
    }),
  };

  // Aplicar headers de segurança
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Rate Limiting básico (simulado)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';

  // Bloquear bots maliciosos conhecidos
  const maliciousBots = ['sqlmap', 'nikto', 'nmap', 'masscan', 'zap', 'burp'];

  if (maliciousBots.some(bot => userAgent.toLowerCase().includes(bot))) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // Bloquear tentativas de acesso a arquivos sensíveis
  const sensitivePaths = [
    '/.env',
    '/.git',
    '/wp-admin',
    '/admin',
    '/phpmyadmin',
    '/.htaccess',
    '/web.config',
  ];

  if (
    sensitivePaths.some(path =>
      request.nextUrl.pathname.toLowerCase().includes(path)
    )
  ) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
