// Import axios to interact with a backend server
import axios from "axios";

// Define an asynchronous function named DeleteCustomer, which takes a unique customerId as a parameter.
// This function will attempt to delete the customer from the backend using their ID.
const DeleteCustomer = async (customerId) => {
    try {
        // Send a DELETE request to the backend, targeting the specific customer by their ID.
        // The URL here is "/api/customers/{customerId}", where {customerId} will be replaced by the actual customer ID.
        // The response contains the server's confirmation of deletion or additional data.
        const response = await axios.delete(`/api/customers/${customerId}`);
        
        // Return the data from the response to the caller, which can use it for additional logic or display
        return response.data;
    } catch (error) {
        // If there's an error during the request, log the error to the console for debugging.
        console.error("Failed to delete customer:", error);
        
        // Rethrow the error so that the calling function is aware something went wrong.
        throw error;
    }
}

// Export the DeleteCustomer function so it can be imported and used in other parts of the application.
export default DeleteCustomer;
