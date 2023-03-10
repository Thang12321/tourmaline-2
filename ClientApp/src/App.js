import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OnlyBodyLayout } from './layouts';
import DefaultLayout from './layouts/DefaultLayout';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Register from './pages/Register';
import { privateRoute, publicRoutes } from './Routes';
import { ForgotPasswordRoute, LOGIN, REGISTER, routesConfigPrivate, routesConfigPublic } from './Routes/routesConfig';

function App() {
    const { isLoggedIn, token } = useSelector((state) => state.auth);
    return (
        <div className="App">
            <Routes>
                <Route path={LOGIN} element={<Login />} />
                <Route path={REGISTER} element={<Register />} />
                <Route path={ForgotPasswordRoute} element={<ForgotPassword />} />
                
                <Route path={routesConfigPublic.homeRoute} element={<DefaultLayout />}>
                    {publicRoutes.map((route, index) => {
                        const Page = route.page;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Route>
                <Route path={routesConfigPrivate.system} element={<OnlyBodyLayout />}>
                    {privateRoute.map((route, index) => {
                        const Page = route.page;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Route>
                <Route path=""></Route>
            </Routes>

            <ToastContainer />
        </div>
    );
}

export default App;
