import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item key={product.id}>
            {product.name} - ${product.price}
            <Link to={`/product/${product.id}`} className="btn btn-info ml-2">Details</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default ProductList;
