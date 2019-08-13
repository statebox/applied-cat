import firebase from 'firebase/app'
import firebaseConfig from '../firebase-config.js'

import 'firebase/auth'
import 'firebase/firestore'

module.exports = function init (config) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config || firebaseConfig)
    }
    return firebase
}