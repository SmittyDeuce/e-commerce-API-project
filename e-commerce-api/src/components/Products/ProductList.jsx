import React, { useEffect, useState } from "react"; // Import React and useState, useEffect hooks
import axios from "axios"; // Import axios for HTTP requests
import { ListGroup, Button } from "react-bootstrap"; // Import Bootstrap components
import { Link } from "react-router-dom"; // Import Link for navigation

function ProductList() {
  // Declare state to hold the list of products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch the list of products from the API
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data); // Set products state
      } catch (error) {
        console.error("Error fetching products", error); // Log errors to console
      }
    };
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ListGroup>
        {/* Render each product as a list item */}
        {products.map((product) => (
          <ListGroup.Item key={product.id}>
            {product.name} - ${product.price}
            {/* Link to the product details page */}
            <Link to={`/product/${product.id}`} className="btn btn-info ml-2">
              Details
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default ProductList;
