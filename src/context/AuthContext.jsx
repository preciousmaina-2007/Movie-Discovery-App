import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return undefined
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setAuthLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      authLoading,
      isFirebaseConfigured,
      signup: (email, password) => {
        if (!auth) {
          return Promise.reject(new Error('Firebase is not configured yet. Add a .env file.'))
        }
        return createUserWithEmailAndPassword(auth, email, password)
      },
      login: (email, password) => {
        if (!auth) {
          return Promise.reject(new Error('Firebase is not configured yet. Add a .env file.'))
        }
        return signInWithEmailAndPassword(auth, email, password)
      },
      loginWithGoogle: () => {
        if (!auth) {
          return Promise.reject(new Error('Firebase is not configured yet. Add a .env file.'))
        }
        return signInWithPopup(auth, new GoogleAuthProvider())
      },
      logout: () => {
        if (!auth) {
          return Promise.resolve()
        }
        return signOut(auth)
      },
    }),
    [currentUser, authLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }

  return context
}
