import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import { persistor, store } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <ProSidebarProvider>
    <App />
    </ProSidebarProvider>
    </PersistGate>
    </Provider>
   </React.StrictMode>
);

