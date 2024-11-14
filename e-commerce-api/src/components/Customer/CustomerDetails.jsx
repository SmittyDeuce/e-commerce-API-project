import React, { useState, useEffect } from "react"; // React hooks
import { Button, Container } from "react-bootstrap"; // Bootstrap components for UI
import { useParams, useNavigate } from "react-router-dom"; // React Router hooks for route params and navigation
import axios from "axios"; // Axios to make HTTP requests

function CustomerDetails() {
  const { customerId } = useParams(); // Extract customerId from the URL params
  const [customer, setCustomer] = useState(null); // State to store customer details
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate(); // Hook for navigation after delete

  // useEffect hook to fetch customer details when the component mounts or customerId changes
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`/api/customers/${customerId}`); // Fetch customer data from API
        setCustomer(response.data); // Set the fetched customer data
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError("Failed to load customer details."); // Error message if request fails
        setLoading(false); // Set loading to false when there's an error
      }
    };

    fetchCustomerDetails(); // Invoke the fetch function
  }, [customerId]); // Dependency on customerId to refetch if the id changes

  // Handle the delete operation
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${customerId}`); // Delete request to backend
      alert("Customer deleted successfully"); // Success message
      navigate("/customers"); // Redirect to the customers list page after successful deletion
    } catch (error) {
      alert("Failed to delete customer."); // Error message if deletion fails
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) return <div>Loading...</div>; // Show loading message until data is fetched
  if (error) return <div>{error}</div>; // Show error message if there was a failure

  return (
    <Container className="mt-4">
      <h3>Customer Details</h3>
      {customer && ( // Only render if customer data is available
        <div>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <Button variant="danger" onClick={handleDelete}>Delete Customer</Button> {/* Delete button */}
        </div>
      )}
    </Container>
  );
}

export default CustomerDetails;
