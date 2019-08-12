import firebase from 'firebase/app'
import firebaseConfig from '../firebase-config.js'

import 'firebase/database'

module.exports = function init (config) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config || firebaseConfig)
    }
    console.log('FB', firebase)
    return firebase
}