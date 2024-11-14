import React, { useEffect, useState } from "react"; // Import necessary hooks
import axios from "axios"; // For making HTTP requests
import { Container, Button } from "react-bootstrap"; // Bootstrap components
import { useParams, useNavigate } from "react-router-dom"; // For accessing route params and navigation

function ProductDetails() {
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const [error, setError] = useState(null); // State for error handling
  const { productId } = useParams(); // Access productId from the URL
  const navigate = useNavigate(); // Navigation hook to go back to the product list page

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data); // Set product details
      } catch (err) {
        setError("Error loading product details."); // Handle error if product fetch fails
      } finally {
        setLoading(false); // Stop loading state after API call is complete
      }
    };
    fetchProduct(); // Fetch product details on component mount
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; // Display error message
  }

  return (
    <Container className="mt-4">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      {/* Button to navigate back to the product list */}
      <Button variant="secondary" onClick={() => navigate("/products")}>
        Back to Product List
      </Button>
    </Container>
  );
}

export default ProductDetails;
