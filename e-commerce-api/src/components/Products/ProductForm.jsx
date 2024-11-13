import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap"; // Import necessary Bootstrap components
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = { name, price };
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5000/api/products", productData);
      const productId = response.data.id;
      navigate(`/product/${productId}`);
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error("Error adding product:", err);  // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create Product</h2>
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
            placeholder="Enter product name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter product price"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ProductForm;
