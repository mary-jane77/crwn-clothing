import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../сustom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const SignUp = () => {
    const [creds, setCreds] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword } = creds;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            createUserProfileDocument(user, {displayName});

            setCreds ({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;

        setCreds({ ...creds, [name]: value })
    }

    return (
        <div className="sign-up">
            <h2 className="title">I do not have a account</h2>
            <span>Sign up with email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    required
                />
                <CustomButton type="submit"> SIGN UP</CustomButton>
            </form>
        </div>
    );
};

export default SignUp;