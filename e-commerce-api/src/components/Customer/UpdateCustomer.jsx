import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap"; // Bootstrap components
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerUpdateForm() {
  const { customerId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`/api/customers/${customerId}`);
        const customer = response.data;
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
      } catch (error) {
        setError("Failed to load customer details.");
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCustomer = { name, email, phone };
    setLoading(true);

    try {
      await axios.put(`/api/customers/${customerId}`, updatedCustomer);
      navigate(`/customer/${customerId}`);
    } catch (err) {
      setError("Failed to update customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Customer</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        {loading && <p>Submitting...</p>}

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CustomerUpdateForm;
