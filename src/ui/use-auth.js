import React from 'react'

import FullPageLoading from './full-page-loading.js'

import firebase from 'firebase/app'
import 'firebase/auth'

import firebaseConfig from '../../firebase-config.js'

AuthProvider.actions = {
  setUser: 'SET_USER',
  toggleLoading: 'TOGGLE_LOADING',
}

const reducer = (
  state,
  action
) => {
  switch (action.type) {
    case AuthProvider.actions.setUser:
      return {
        user: action.payload.user,
        isInitiallyLoading: false,
        isLoading: false,
      }
    case AuthProvider.actions.toggleLoading:
      return {
        ...state,
        isLoading: action.payload.value,
      }
    default:
      throw new Error(`No case for type ${action.type} found.`)
  }
}

const AuthContext = React.createContext(undefined)

export function AuthProvider({
  initialUser,
  children,
}) {
  const [state, dispatch] = React.useReducer(reducer, {
    isInitiallyLoading: true,
    isLoading: false,
    user: null,
  })

  const signingInSoDontDispatchOnAuthStateChange = React.useRef(false)
  React.useEffect(() => {
    // Setup Firebase authentication state observer and get user data.
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        if (signingInSoDontDispatchOnAuthStateChange.current) {
          signingInSoDontDispatchOnAuthStateChange.current = false
          return
        }

        dispatch({
          type: AuthProvider.actions.setUser,
          payload: {
            user,
          },
        })
      } else {
        // User is signed out.
        dispatch({
          type: AuthProvider.actions.setUser,
          payload: {
            user: null,
          },
        })
      }
    })
  }, [])

  const signup = (email, password, displayName) => {
    signingInSoDontDispatchOnAuthStateChange.current = true

    toggleLoading(true)

    let user;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        user = firebase.auth().currentUser
        user.sendEmailVerification()
      })
      .then(() => {
        user.updateProfile({
          displayName,
        })
      })
      .then(() => {
        toggleLoading(false)
        // Set user with displayName here because user.updateProfile
        // is async and our onAuthStateChanged listener will fire
        // before the user is updated. When that happens, user.displayName
        // value will be null.
        // Reference: https://github.com/firebase/firebaseui-web/issues/36
        const updatedUserWithDisplayName = {
          ...user,
          displayName,
        }

        dispatch({
          type: AuthProvider.actions.setUser,
          payload: {
            user: updatedUserWithDisplayName,
          },
        })
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message

        console.log('errorCode', errorCode, 'errorMessage', errorMessage)
        toggleLoading(false)
      })
  }

  const signin = (email, password) => {
    toggleLoading(true)

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        toggleLoading(false)
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode', errorCode, 'errorMessage', errorMessage)
        toggleLoading(false)
      })
  }

  const signout = () => {
    toggleLoading(true)

    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        toggleLoading(false)
      })
      .catch(function(error) {
        // An error happened.
        toggleLoading(false)
      })
  }

  const sendResetPasswordEmail = (email) => {
    toggleLoading(true)

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        // Email sent.
        toggleLoading(true)
        // TODO: Toggle success notification here.
      })
      .catch(function(error) {
        // An error happened.
        console.log('error', error)
        toggleLoading(false)
      })
  }

  const toggleLoading = (isLoading) => {
    dispatch({
      type: AuthProvider.actions.toggleLoading,
      payload: {
        value: isLoading,
      },
    })
  }

  const value = {
    user: initialUser || state.user,
    signup,
    signin,
    signout,
    sendResetPasswordEmail,
    isLoading: state.isLoading,
  }

  return state.isInitiallyLoading ? (
    <FullPageLoading />
  ) : (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

// AuthProvider
// useAuth() => result from React.useContext(AuthContext)