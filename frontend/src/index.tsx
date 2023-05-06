import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./app/store";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {addInterceptors} from "./axiosApi";
import theme from "./theme";

addInterceptors(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);