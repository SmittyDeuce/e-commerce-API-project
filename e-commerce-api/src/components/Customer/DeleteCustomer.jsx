// Import axios to make HTTP requests
import axios from "axios";

// Function to delete a customer by their ID
const DeleteCustomer = async (customerId) => {
    try {
        // Sending a DELETE request to the server to remove the customer
        const response = await axios.delete(`/api/customers/${customerId}`);
        
        // Return the response data to confirm the deletion or handle further actions
        return response.data;
    } catch (error) {
        // Log any error encountered during the request for debugging
        console.error("Error deleting customer:", error);
        
        // Rethrow the error so the caller can handle it (e.g., display an error message)
        throw error;
    }
}

// Export the DeleteCustomer function so it can be used elsewhere
export default DeleteCustomer;
