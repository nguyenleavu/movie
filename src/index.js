import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Style from './components/Style/Style';
import { UserAuthContextProvider } from './context/UserAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Style>
        <UserAuthContextProvider>
            <App />
        </UserAuthContextProvider>
    </Style>
);
