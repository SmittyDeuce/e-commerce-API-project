import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap"; // Import Bootstrap components
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerDetails() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${customerId}`);
      alert("Customer deleted successfully");
      navigate("/customers");
    } catch (error) {
      alert("Failed to delete customer.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-4">
      <h3>Customer Details</h3>
      {customer && (
        <div>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <Button variant="danger" onClick={handleDelete}>Delete Customer</Button>
        </div>
      )}
    </Container>
  );
}

export default CustomerDetails;
