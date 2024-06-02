import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './client.jsx'
import { AuthProvider } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext.jsx';
import { ItemsProvider } from './context/ItemsContext.jsx';

import App from './App.jsx'
import './index.scss'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <UserDataProvider>
            <ItemsProvider>
              <App />
            </ItemsProvider>
          </UserDataProvider>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)