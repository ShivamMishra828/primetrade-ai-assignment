import { type NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { type Dispatch, type SetStateAction, useEffect } from 'react';

type Props = {
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

function RefreshHandler({ setIsAuthenticated }: Props): null {
    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (
                location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated]);
    return null;
}

export default RefreshHandler;
