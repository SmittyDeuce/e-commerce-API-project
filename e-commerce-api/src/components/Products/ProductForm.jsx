import React, { useState } from "react"; // Import React and the useState hook
import { Button, Form, Container } from "react-bootstrap"; // Import necessary Bootstrap components
import { useNavigate } from "react-router-dom"; // For navigation after successful submission
import axios from "axios"; // Import axios for HTTP requests

function ProductForm() {
  // Declare state variables to manage form data and loading/error state
  const [name, setName] = useState(""); // Product name
  const [price, setPrice] = useState(""); // Product price
  const [loading, setLoading] = useState(false); // Track loading state for submission
  const [error, setError] = useState(null); // Track errors during form submission

  const navigate = useNavigate(); // Navigate to another page after successful submission

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Prepare data to send in the API request
    const productData = { name, price };
    setLoading(true); // Set loading to true to disable button and show progress

    try {
      // Make an HTTP POST request to add the product
      const response = await axios.post("http://localhost:5000/api/products", productData);
      const productId = response.data.id; // Get the product ID from the response
      navigate(`/product/${productId}`); // Navigate to the product detail page
    } catch (err) {
      setError("Failed to add product. Please try again."); // Show error message if request fails
      console.error("Error adding product:", err); // Log the error for debugging
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create Product</h2>
      <Form onSubmit={handleSubmit}> {/* Form submission handler */}
        {loading && <p>Submitting...</p>} {/* Show submitting text while the request is in progress */}
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if there's an error */}

        {/* Form input for product name */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state when user types in the input
            required
            placeholder="Enter product name"
          />
        </Form.Group>

        {/* Form input for product price */}
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)} // Update state when user types in the input
            required
            placeholder="Enter product price"
          />
        </Form.Group>

        {/* Submit button */}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"} {/* Button text changes when submitting */}
        </Button>
      </Form>
    </Container>
  );
}

export default ProductForm;
