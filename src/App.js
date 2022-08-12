import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import { lazy, Suspense } from 'react';
import useAth from './hooks/useAth';
import { RoutePages } from './routes/routes';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';

const Login = lazy(() => import('~/pages/Login/Login'));
const SignUp = lazy(() => import('~/pages/SignUp/SignUp'));
const NotFound = lazy(() => import('~/components/common/NotFound'));

function App() {
    const { user } = useAth();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/login'
                    element={
                        <Suspense fallback={<h1>Loading....</h1>}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path='/sign_up'
                    element={
                        <Suspense fallback={<h1>Loading....</h1>}>
                            <SignUp />
                        </Suspense>
                    }
                />
                {RoutePages.map((route, index) => {
                    const Page = route.component;

                    let Layout = route.layout || DefaultLayout;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PrivateRoute user={user}>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />
                    );
                })}
                <Route
                    path='/not_fount'
                    element={
                        <Suspense fallback={<h1>Loading....</h1>}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
