import React, { useEffect, useState } from "react"; // Import React and hooks
import { Button, Form, Container } from "react-bootstrap"; // Bootstrap components
import { useNavigate, useParams } from "react-router-dom"; // For navigation and fetching params
import axios from "axios"; // For HTTP requests

function ProductUpdate() {
  // Declare state variables for product data and form status
  const [name, setName] = useState(""); // Product name
  const [price, setPrice] = useState(""); // Product price
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(null); // Tracks error messages
  const { productId } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Navigation hook to redirect after successful update

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details by ID
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setName(response.data.name); // Set product name
        setPrice(response.data.price); // Set product price
      } catch (error) {
        setError("Failed to load product details."); // Show error if product not found
      }
    };
    fetchProduct(); // Fetch product details when component mounts
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission default behavior
    const updatedProduct = { name, price }; // Prepare updated product data
    setLoading(true); // Set loading state to true

    try {
      // Make API request to update the product
      await axios.put(`http://localhost:5000/api/products/${productId}`, updatedProduct);
      navigate(`/product/${productId}`); // Navigate to product detail page after success
    } catch (err) {
      setError("Failed to update product."); // Show error message if update fails
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message if any */}

      <Form onSubmit={handleSubmit}>
        {/* Form for updating product name */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
            required
            placeholder="Enter product name"
          />
        </Form.Group>

        {/* Form for updating product price */}
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)} // Update price state
            required
            placeholder="Enter product price"
          />
        </Form.Group>

        {/* Submit button */}
        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ProductUpdate;
