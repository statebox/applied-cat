import React from "react";
import { Form, Field } from "react-final-form";

// TODO add validation
const validate = async values => {};

// onSubmit : {values} => ...
const LoginForm = ({ onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <div>
            <label>E-Mail</label>
            <Field
              name="email"
              type="email"
              component="input"
              placeholder="Your e-mail address"
            />
          </div>
          <div>
            <label>Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Your password"
            />
          </div>
          <button type="submit" disabled={pristine || invalid}>
            Login
          </button>
        </form>
      )}
    />
  );
};

export default LoginForm;
