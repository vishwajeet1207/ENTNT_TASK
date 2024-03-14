import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { AuthProvieder } from "./Context/AuthContext";
import { CartProvider } from "./Context/Cart";
import { SearchProvieder } from "./Context/Search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SearchProvieder>
          <AuthProvieder>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvieder>
        </SearchProvieder>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
