import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomerId: null,
    };
  }

  handleCustomerSubmit = (formData) => {
    console.log('Customer data submitted:', formData);
  };

  render() {
    return (
      <div>
        <h1>Customer Management</h1>
        <Routes>
          <Route
            path='/create-customer'
            element={<CustomerForm onSubmit={this.handleCustomerSubmit} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
