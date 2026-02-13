import React, { type SyntheticEvent, useState } from 'react';
import { Link, type NavigateFunction, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils.ts';

type LoginInfo = {
    email: string;
    password: string;
};

function Login() {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        email: '',
        password: '',
    });

    const navigate: NavigateFunction = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginInfo((prev: LoginInfo) => ({
            ...prev,
            [name as keyof LoginInfo]: value,
        }));
    };

    const handleSignup = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password is required');
        }

        try {
            const url = 'http://localhost:3000/api/v1/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
                credentials: 'include',
            });

            const result = await response.json();

            if (response.ok) {
                handleSuccess(result?.success.message);
                localStorage.setItem('token', result?.success.data.token);
                setTimeout((): void => {
                    navigate('/home');
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
            <h1>Login</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoFocus
                        placeholder="Enter your email address..."
                        value={loginInfo.email}
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
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
                <span>
                    Doesn't have an account?
                    <Link to={'/signup'}>Signup</Link>
                </span>
            </form>
        </div>
    );
}

export default Login;
