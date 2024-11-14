import React, { useState } from "react"; // Import React to use JSX and state management
import { Button, Form, Container } from "react-bootstrap"; // Import Bootstrap components for styling and layout
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation after submitting the form
import axios from "axios"; // Import axios to make HTTP requests to the backend

function CustomerForm() {
  // Declare state variables for storing form input data and error messages
  const [name, setName] = useState(""); // Customer's name
  const [email, setEmail] = useState(""); // Customer's email
  const [phone, setPhone] = useState(""); // Customer's phone number
  const [loading, setLoading] = useState(false); // Loading state to disable button during form submission
  const [error, setError] = useState(null); // Error state to store any error messages during form submission

  // useNavigate hook is used to navigate programmatically after a successful form submission
  const navigate = useNavigate();

  // handleSubmit is the function that handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const customerData = { name, email, phone }; // Collect form data into an object
    setLoading(true); // Set loading state to true to disable submit button during request
  
    try {
      // Send POST request to the backend API to add a new customer
      const response = await axios.post("http://localhost:5000/api/customers", customerData);
      const customerId = response.data.id; // Get the customer ID from the response
      navigate(`/customer/${customerId}`); // Navigate to the customer details page with the newly created customer ID
    } catch (err) {
      // Handle errors during the POST request
      console.error("Error adding customer:", err);
      if (err.response) {
        console.error("Error Response:", err.response.data); // Log error response from the server
        setError(err.response.data.message || "Failed to add customer. Please try again."); // Set error message based on server response
      } else {
        setError("Failed to add customer. Please try again."); // Set generic error message if no response from server
      }
    } finally {
      setLoading(false); // Set loading state back to false after request is completed
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create Customer</h2>
      {/* Render error message if there is any */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Form to add a new customer */}
      <Form onSubmit={handleSubmit}>
        {/* Display submitting message if the request is in progress */}
        {loading && <p>Submitting...</p>}

        {/* Form fields for customer data */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name} // Bind input value to state variable
            onChange={(e) => setName(e.target.value)} // Update state when input changes
            required // Mark this field as required
            placeholder="Enter customer's name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email} // Bind input value to state variable
            onChange={(e) => setEmail(e.target.value)} // Update state when input changes
            required // Mark this field as required
            placeholder="Enter customer's email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={phone} // Bind input value to state variable
            onChange={(e) => setPhone(e.target.value)} // Update state when input changes
            required // Mark this field as required
            placeholder="Enter customer's phone number"
          />
        </Form.Group>

        {/* Submit button to submit the form */}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"} {/* Display loading state on button */}
        </Button>
      </Form>
    </Container>
  );
}

export default CustomerForm;
