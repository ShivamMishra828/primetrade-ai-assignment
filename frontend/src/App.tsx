import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { type ReactElement, useState } from 'react';
import RefreshHandler from './Components/RefreshHandler';

type PrivateRouteProps = {
    isAuthenticated: boolean;
    children: ReactElement;
};

function PrivateRoute({ isAuthenticated, children }: PrivateRouteProps): ReactElement {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App(): ReactElement {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    return (
        <div className="App">
            <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/home"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
