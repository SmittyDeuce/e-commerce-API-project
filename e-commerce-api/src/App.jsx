import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerForm from "./components/Customer/CustomerForm";
import CustomerDetails from "./components/Customer/CustomerDetails";
import CustomerUpdateForm from "./components/Customer/UpdateCustomer";

function App() {
  return (
      <Container>
        <Routes>
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/customer/:customerId" element={<CustomerDetails />} />
          <Route path="/customer/:customerId/update" element={<CustomerUpdateForm />} />
        </Routes>
      </Container>
  );
}

export default App;
