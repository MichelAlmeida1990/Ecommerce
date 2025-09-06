'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  cpf: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message: string }>;
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  confirmPassword: string;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          if (!auth) {
            throw new Error('Firebase não configurado');
          }

          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const firebaseUser = userCredential.user;

          // Buscar dados adicionais do usuário no Firestore (se disponível)
          let userData = null;
          if (db) {
            try {
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
              userData = userDoc.data();
            } catch (error) {
              console.log(
                'Firestore não disponível, usando dados do Firebase Auth'
              );
            }
          }

          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: userData?.name || firebaseUser.displayName || 'Usuário',
            phone: userData?.phone || '',
            cpf: userData?.cpf || '',
            createdAt: userData?.createdAt || new Date().toISOString(),
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true, message: 'Login realizado com sucesso!' };
        } catch (error: any) {
          set({ isLoading: false });
          let message = 'Erro ao fazer login. Tente novamente.';

          if (error.message === 'Firebase não configurado') {
            message =
              'Firebase não configurado. Verifique as variáveis de ambiente.';
          } else if (error.code === 'auth/user-not-found') {
            message = 'Usuário não encontrado.';
          } else if (error.code === 'auth/wrong-password') {
            message = 'Senha incorreta.';
          } else if (error.code === 'auth/invalid-email') {
            message = 'Email inválido.';
          }

          return { success: false, message };
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });

        try {
          if (!auth) {
            throw new Error('Firebase não configurado');
          }

          const result = await signInWithPopup(auth, googleProvider);
          const firebaseUser = result.user;

          // Verificar se é um novo usuário (se Firestore disponível)
          let userData = null;
          if (db) {
            try {
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

              if (!userDoc.exists()) {
                // Criar documento do usuário no Firestore
                await setDoc(doc(db, 'users', firebaseUser.uid), {
                  name: firebaseUser.displayName || '',
                  email: firebaseUser.email || '',
                  phone: '',
                  cpf: '',
                  createdAt: new Date().toISOString(),
                  provider: 'google',
                });
              }

              userData = userDoc.data();
            } catch (error) {
              console.log(
                'Firestore não disponível, usando dados do Firebase Auth'
              );
            }
          }

          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || userData?.name || 'Usuário',
            phone: userData?.phone || '',
            cpf: userData?.cpf || '',
            createdAt: userData?.createdAt || new Date().toISOString(),
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          return {
            success: true,
            message: 'Login com Google realizado com sucesso!',
          };
        } catch (error: any) {
          set({ isLoading: false });
          let message = 'Erro ao fazer login com Google. Tente novamente.';

          if (error.message === 'Firebase não configurado') {
            message =
              'Firebase não configurado. Verifique as variáveis de ambiente.';
          } else if (error.code === 'auth/popup-closed-by-user') {
            message = 'Login cancelado pelo usuário.';
          } else if (error.code === 'auth/popup-blocked') {
            message = 'Popup bloqueado pelo navegador.';
          }

          return { success: false, message };
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });

        try {
          // Validações básicas
          if (userData.password !== userData.confirmPassword) {
            set({ isLoading: false });
            return { success: false, message: 'As senhas não coincidem' };
          }

          if (userData.password.length < 6) {
            set({ isLoading: false });
            return {
              success: false,
              message: 'A senha deve ter pelo menos 6 caracteres',
            };
          }

          if (!auth) {
            throw new Error('Firebase não configurado');
          }

          // Criar usuário no Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
          );

          const firebaseUser = userCredential.user;

          // Criar documento do usuário no Firestore (se disponível)
          if (db) {
            try {
              await setDoc(doc(db, 'users', firebaseUser.uid), {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                cpf: userData.cpf,
                createdAt: new Date().toISOString(),
                provider: 'email',
              });
            } catch (error) {
              // Firestore não disponível, dados salvos apenas no Firebase Auth
            }
          }

          const user: User = {
            id: firebaseUser.uid,
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            cpf: userData.cpf,
            createdAt: new Date().toISOString(),
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true, message: 'Cadastro realizado com sucesso!' };
        } catch (error: any) {
          set({ isLoading: false });
          let message = 'Erro ao fazer cadastro. Tente novamente.';

          if (error.message === 'Firebase não configurado') {
            message =
              'Firebase não configurado. Verifique as variáveis de ambiente.';
          } else if (error.code === 'auth/email-already-in-use') {
            message = 'Este email já está cadastrado.';
          } else if (error.code === 'auth/invalid-email') {
            message = 'Email inválido.';
          } else if (error.code === 'auth/weak-password') {
            message = 'Senha muito fraca.';
          }

          return { success: false, message };
        }
      },

      logout: async () => {
        try {
          if (auth) {
            await firebaseSignOut(auth);
          }
          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          // Erro ao fazer logout
        }
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...userData },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const useAuth = useAuthStore;

// Hook personalizado para facilitar o uso
export function useAuthContext() {
  const auth = useAuthStore();
  return auth;
}
