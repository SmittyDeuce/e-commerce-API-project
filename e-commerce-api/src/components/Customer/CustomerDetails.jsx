import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerDetails({ customerId }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch customer details from the backend
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`/api/customers/${customerId}`);
        setCustomer(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load customer details.");
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Customer Details</h3>
      {customer && (
        <div>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          {/* You can add more fields as needed */}
        </div>
      )}
    </div>
  );
}

export default CustomerDetails;
