import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "./ProductConfirmation";


function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to load product details.");
      }
    };
    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      navigate("/products");
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  const handleModalClose = () => setShowModal(false);  // Close the modal
  const handleModalConfirm = () => {
    handleDelete();  // Proceed with delete
    handleModalClose();  // Close the modal after confirming
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return product ? (
    <div>
      <h2>Product Details</h2>
      <p>Name: {product.name}</p>
      <p>Price: ${product.price}</p>

      <Button variant="danger" onClick={() => setShowModal(true)} >
        Delete Product
      </Button>

      <ConfirmationModal
        show={showModal}
        onConfirm={handleModalConfirm}
        onCancel={handleModalClose} 
      
      />
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ProductDetails;
