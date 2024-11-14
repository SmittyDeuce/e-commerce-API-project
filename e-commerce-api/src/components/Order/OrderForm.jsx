import React, { useEffect, useState } from "react"; // Import React and useState, useEffect hooks
import axios from "axios"; // Import axios for API requests
import { Form, Button, Container } from "react-bootstrap"; // Bootstrap components for styling

function OrderForm() {
  // Declare state variables for form data and API responses
  const [customers, setCustomers] = useState([]); // Stores list of customers
  const [products, setProducts] = useState([]); // Stores list of products
  const [selectedCustomer, setSelectedCustomer] = useState(""); // Tracks selected customer
  const [selectedProducts, setSelectedProducts] = useState([]); // Tracks selected products
  const [orderDate, setOrderDate] = useState(""); // Tracks order date
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message after form submission
  const [errorMessage, setErrorMessage] = useState(""); // Error message when something goes wrong

  // Fetch customers and products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers and products from the API
        const customerResponse = await axios.get("http://localhost:5000/api/customers");
        setCustomers(customerResponse.data); // Set customers state
        const productResponse = await axios.get("http://localhost:5000/api/products");
        setProducts(productResponse.data); // Set products state
      } catch (error) {
        console.error("Error fetching data:", error); // Log errors to console
        setErrorMessage("Error loading customers or products."); // Display error message
      }
    };
    fetchData(); // Call the fetch function when component mounts
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true
    setSuccessMessage(""); // Clear previous success message
    setErrorMessage(""); // Clear previous error message

    // Prepare the order data to be sent
    const orderData = {
      customerId: selectedCustomer,
      productIds: selectedProducts,
      orderDate,
    };

    try {
      // Make the API request to submit the order
      await axios.post("http://localhost:5000/api/orders", orderData);
      setSuccessMessage("Order placed successfully!"); // Display success message
      // Reset form fields after submission
      setSelectedCustomer("");
      setSelectedProducts([]);
      setOrderDate("");
    } catch (error) {
      console.error("Error placing order:", error.response || error); // Log error
      setErrorMessage("Failed to place order."); // Display error message
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <Container className="mt-4">
      <h2>Place Order</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} {/* Show success message */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Show error message */}
      <Form onSubmit={handleSubmit}>
        {/* Customer selection */}
        <Form.Group className="mb-3">
          <Form.Label>Customer</Form.Label>
          <Form.Select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)} // Update selected customer
            required
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Product selection (multiple select) */}
        <Form.Group className="mb-3">
          <Form.Label>Products</Form.Label>
          <Form.Select
            multiple
            value={selectedProducts}
            onChange={(e) =>
              setSelectedProducts([...e.target.selectedOptions].map((option) => option.value)) // Update selected products
            }
            required
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Order date */}
        <Form.Group className="mb-3">
          <Form.Label>Order Date</Form.Label>
          <Form.Control
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)} // Update order date
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"} {/* Change button text based on loading state */}
        </Button>
      </Form>
    </Container>
  );
}

export default OrderForm;
