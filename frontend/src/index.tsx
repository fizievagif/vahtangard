import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {PersistGate} from "redux-persist/integration/react";
import {ThemeProvider} from "@mui/material";
import App from './App';
import theme from "./theme";
import {persistor, store} from "./app/store";
import {addInterceptors} from "./axiosApi";
import {GOOGLE_CLIENT_ID} from "./constants";

addInterceptors(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);