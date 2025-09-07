import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX'
}

// Debug: verificar se as variáveis estão sendo carregadas
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
})

// Verificar se já existe uma instância do Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Inicializar serviços apenas se as variáveis de ambiente estiverem configuradas
export const auth = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_API_KEY 
  ? getAuth(app) 
  : null

export const db = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_API_KEY 
  ? getFirestore(app) 
  : null

export const storage = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_API_KEY 
  ? getStorage(app) 
  : null

// Provedor do Google
export const googleProvider = new GoogleAuthProvider()

export default app
