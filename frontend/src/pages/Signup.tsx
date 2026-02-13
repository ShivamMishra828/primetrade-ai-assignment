import { Link, type NavigateFunction, useNavigate } from 'react-router-dom';
import { type SyntheticEvent, useState } from 'react';
import { handleError, handleSuccess } from '../utils.ts';
import React from 'react';

type SignupInfo = {
    email: string;
    password: string;
    role: string;
};

function Signup() {
    const [signupInfo, setSignupInfo] = useState<SignupInfo>({
        email: '',
        password: '',
        role: 'user',
    });

    const navigate: NavigateFunction = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setSignupInfo((prev: SignupInfo) => ({
            ...prev,
            [name as keyof SignupInfo]: value,
        }));
    };

    const handleSignup = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const { email, password } = signupInfo;
        if (!email || !password) {
            return handleError('Email and password is required');
        }

        try {
            const url = 'http://localhost:3000/api/v1/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();

            if (response.ok) {
                handleSuccess(result?.success.message);
                setTimeout((): void => {
                    navigate('/login');
                }, 1000);
            } else {
                if (result.error.code === 'VALIDATION_ERROR') {
                    handleError(result.error?.details[0].message);
                } else {
                    handleError(result.error?.message);
                }
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleError(err.message);
            } else {
                handleError('Something went wrong');
            }
        }
    };

    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoFocus
                        placeholder="Enter your email address..."
                        value={signupInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password..."
                        value={signupInfo.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Signup</button>
                <span>
                    Already have an account?
                    <Link to={'/login'}>Login</Link>
                </span>
            </form>
        </div>
    );
}

export default Signup;
