import React from "react";
import CustomerForm from "./components/Customer/CustomerForm";
import CustomerDetails from "./components/Customer/CustomerDetails";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const customerId = null
  return (
    <div className="App">
      <h1>Customer Information Form</h1>
      <CustomerForm /> {/* Render the CustomerForm component */}
      <CustomerDetails /> {/* Render the CustomerDetails component */}
    </div>
  );
}

export default App;