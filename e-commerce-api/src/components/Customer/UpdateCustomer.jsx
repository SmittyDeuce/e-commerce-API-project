import React, { useState, useEffect } from "react"; // Import necessary React hooks
import { Button, Form, Container } from "react-bootstrap"; // Bootstrap components for UI
import { useParams, useNavigate } from "react-router-dom"; // React Router hooks for route params and navigation
import axios from "axios"; // Axios for making HTTP requests

function CustomerUpdateForm() {
  const { customerId } = useParams(); // Get customerId from URL params
  const [name, setName] = useState(""); // State for customer name
  const [email, setEmail] = useState(""); // State for customer email
  const [phone, setPhone] = useState(""); // State for customer phone
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Function to navigate to other routes

  // Fetch existing customer details based on the customerId from URL
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`/api/customers/${customerId}`); // Fetch customer data
        const customer = response.data; // Extract data from the response
        setName(customer.name); // Set name from the response
        setEmail(customer.email); // Set email from the response
        setPhone(customer.phone); // Set phone from the response
      } catch (error) {
        setError("Failed to load customer details."); // Show error if the fetch fails
      }
    };

    fetchCustomerDetails(); // Invoke the function to fetch customer details
  }, [customerId]); // Dependency array ensures effect runs when customerId changes

  // Handle form submission to update customer details
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const updatedCustomer = { name, email, phone }; // Prepare updated customer data
    setLoading(true); // Set loading state to true while the request is in progress

    try {
      await axios.put(`/api/customers/${customerId}`, updatedCustomer); // Send PUT request to update customer
      navigate(`/customer/${customerId}`); // Redirect to the updated customer’s page after successful update
    } catch (err) {
      setError("Failed to update customer. Please try again."); // Handle error in case of failure
    } finally {
      setLoading(false); // Reset loading state after the request is complete
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Customer</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error if exists */}
      <Form onSubmit={handleSubmit}> {/* Handle form submission */}
        {loading && <p>Submitting...</p>} {/* Show loading text during submission */}

        {/* Form to update customer's details */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name on change
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email on change
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} // Update phone on change
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CustomerUpdateForm;
