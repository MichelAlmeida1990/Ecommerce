// Sanitização de inputs
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove caracteres HTML básicos
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000) // Limita tamanho
}

// Validação de email mais robusta
export function isValidEmailStrict(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

// Validação de senha forte
export function isStrongPassword(password: string): boolean {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar
}

// Validação de telefone brasileiro
export function isValidBrazilianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '')
  return /^(\d{10}|\d{11})$/.test(cleanPhone) && 
         (cleanPhone.startsWith('11') || cleanPhone.startsWith('21') || 
          cleanPhone.startsWith('31') || cleanPhone.startsWith('41') || 
          cleanPhone.startsWith('51') || cleanPhone.startsWith('61') || 
          cleanPhone.startsWith('71') || cleanPhone.startsWith('81') || 
          cleanPhone.startsWith('85') || cleanPhone.startsWith('95'))
}

// Validação de CEP
export function isValidCEP(cep: string): boolean {
  const cleanCEP = cep.replace(/\D/g, '')
  return /^\d{8}$/.test(cleanCEP)
}

// Rate limiting simples (localStorage)
export function checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  if (typeof window === 'undefined') return true
  
  const now = Date.now()
  const attempts = JSON.parse(localStorage.getItem(`rate_limit_${key}`) || '[]')
  
  // Remove tentativas antigas
  const recentAttempts = attempts.filter((time: number) => now - time < windowMs)
  
  if (recentAttempts.length >= maxAttempts) {
    return false
  }
  
  // Adiciona nova tentativa
  recentAttempts.push(now)
  localStorage.setItem(`rate_limit_${key}`, JSON.stringify(recentAttempts))
  
  return true
}

// Validação de entrada para prevenir XSS
export function validateInput(input: string, type: 'text' | 'email' | 'phone' | 'cpf' | 'cep'): boolean {
  const sanitized = sanitizeInput(input)
  
  switch (type) {
    case 'email':
      return isValidEmailStrict(sanitized)
    case 'phone':
      return isValidBrazilianPhone(sanitized)
    case 'cpf':
      return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(sanitized)
    case 'cep':
      return isValidCEP(sanitized)
    case 'text':
    default:
      return sanitized.length > 0 && sanitized.length <= 1000
  }
}

// Geração de token CSRF simples
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Validação de token CSRF
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken && token.length === 64
}
