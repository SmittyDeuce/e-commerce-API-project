import React, { useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductUpdate() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        setError("Failed to load product details.");
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = { name, price };
    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, updatedProduct);
      navigate(`/product/${productId}`);
    } catch (err) {
      setError("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Form onSubmit={handleSubmit}>
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

export default ProductUpdate;
