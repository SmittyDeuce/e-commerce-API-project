import React, {useState }  from 'react'
import { Route, Routes } from 'react-router-dom'
import { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomerId: null
    };
  }

  handleCustomerSubmit = (formData) => {
    console.log('Customer data submitted:', formData)
  }

  render() {

    return(
      <Router>
        <div>
          <h1>Customer Management</h1>
          <Routes>
            <Route path='/create-customer' element={<CustomerForm onSubmit={this.handleCustomerSubmit} />} />
          </Routes>
        </div>
      </Router>

    );
  }
}

export default App
