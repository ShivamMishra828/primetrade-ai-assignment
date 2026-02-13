import type { SyntheticEvent } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils.ts';

function Home() {
    const navigate: NavigateFunction = useNavigate();

    const handleLogout = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/logout', {
                method: 'GET',
                credentials: 'include',
            });

            const result = await response.json();

            if (response.ok) {
                handleSuccess(result.success.message);
                localStorage.removeItem('token');

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                handleError(result.error?.message || 'Logout failed');
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
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
