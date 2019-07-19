import React from 'react'
import ReactDOM from 'react-dom'
import App from './ui/app';

import {AuthProvider} from './ui/use-auth.js'

let app = (
    <AuthProvider>
        <App/>
    </AuthProvider>
)

let el = document.getElementById('app')
ReactDOM.render(app, el)