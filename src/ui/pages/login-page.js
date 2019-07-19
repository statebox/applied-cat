import React from "react"
import { withRouter } from 'react-router-dom'

import Center from '../parts/center.js'
import LoginForm from "../forms/login-form.js"
import useAuth from '../use-auth.js'
import { SignupLink } from "../routing.js";

export default function LoginPage () {
  let {signin} = useAuth()

  let WorkingLoginForm = withRouter(({ history }) => (
    <LoginForm
        onSubmit={async values => {
          console.log("Login:", values);
          await signin(values.email, values.password)
          history.push('/account')
        }}
    />
  ))
  

  return (
    <Center>
      <WorkingLoginForm/>
      <p>
        Or, if you don't yet have an account: <SignupLink/>
      </p>
    </Center>
  );
}
