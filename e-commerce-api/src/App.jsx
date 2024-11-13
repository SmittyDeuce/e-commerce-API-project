import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerForm from "./components/Customer/CustomerForm";
import CustomerDetails from "./components/Customer/CustomerDetails";
import CustomerUpdateForm from "./components/Customer/UpdateCustomer";
import ProductList from "./components/Products/ProductList"; // New Component for listing products
import ProductForm from "./components/Products/ProductForm";
import ProductDetails from "./components/Products/ProductDetails";
import ProductUpdate from "./components/Products/UpdateProduct";
function App() {
  return (
    <Container>
      <Routes>
        {/* Customer Routes */}
        <Route path="/add-customer" element={<CustomerForm />} />
        <Route path="/customer/:customerId" element={<CustomerDetails />} />
        <Route path="/customer/:customerId/update" element={<CustomerUpdateForm />} />

        {/* Product Routes */}
        <Route path="/add-product" element={<ProductForm />} /> {/* New route for adding product */}
        <Route path="/products" element={<ProductList />} /> {/* New route for listing products */}
        <Route path="/product/:productId" element={<ProductDetails />} /> {/* New route for product details */}
        <Route path="/product/:productId/update" element={<ProductUpdate />} /> {/* New route for updating product */}
      </Routes>
    </Container>
  );
}

export default App;
