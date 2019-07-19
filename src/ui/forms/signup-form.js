import React from "react";
import { Form, Field } from "react-final-form";

// TODO add validation
const validate = async values => {};

// onSubmit : {values} => ...

const SignupForm = ({ onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <h2>Signup Form</h2>
          <div>
            <label>Name</label>
            <Field name="displayName" type="text" component="input" placeholder="Name" />
          </div>
          <div>
            <label>E-Mail</label>
            <Field
              name="email"
              type="email"
              component="input"
              placeholder="e-mail address"
            />
          </div>
          <div>
            <label>Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="new password"
            />
          </div>
          <button type="submit" disabled={pristine || invalid}>
            Signup
          </button>
        </form>
      )}
    />
  );
};

export default SignupForm;
