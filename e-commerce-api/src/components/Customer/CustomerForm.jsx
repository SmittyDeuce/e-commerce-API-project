import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap"; // Import necessary Bootstrap components
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customerData = { name, email, phone };
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5000/api/customers", customerData);
      const customerId = response.data.id;
      navigate(`/customer/${customerId}`);
    } catch (err) {
      console.error("Error adding customer:", err);
      if (err.response) {
        console.error("Error Response:", err.response.data);
        setError(err.response.data.message || "Failed to add customer. Please try again.");
      } else {
        setError("Failed to add customer. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container className="mt-4">
      <h2>Create Customer</h2>
      <Form onSubmit={handleSubmit}>
        {loading && <p>Submitting...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter customer's name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter customer's email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter customer's phone number"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CustomerForm;