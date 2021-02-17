import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../сustom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
    const [creds, setCreds] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = creds;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setCreds({
                email: '',
                password: '',
            });
        } catch (error) {
            console.log(error);
        }

       
    };

    const handleChange = (e) => {
        const { value, name } = e.target;

        setCreds({ ...creds, [name]: value });
    };

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    value={creds.email}
                    label="email"
                    handleChange={handleChange}
                    required />
                <FormInput
                    name="password"
                    type="password"
                    label="password"
                    value={creds.password}
                    handleChange={handleChange}
                    required />
                <div className='buttons'>
                    <CustomButton type="submit">Submit Form</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        {''}
                Sign in with Google
                {''}
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

export default SignIn;