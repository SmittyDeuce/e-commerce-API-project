import React from "react";
import  ReactDOM  from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CustomerForm from "./components/CustomerForm";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <CustomerForm />
    </BrowserRouter>
  </React.StrictMode>
)