import React from "react";

import SignupForm from "../forms/signup-form.js";
import Center from '../parts/center.js'
import {LoginLink} from '../routing.js'  
import useAuth from '../use-auth.js'

export default function SignupPage() {
    let {isLoading, signup} = useAuth()

    return (
        <Center>
            {isLoading ? <p>signing up...</p> : <SignupForm
                onSubmit={async values => {
                console.log("Signup:", values);
                await signup(values.email, values.password, values.displayName)
                }}
            /> }
            <p>
                Back to <LoginLink/>
            </p>
        </Center>
    )
}
