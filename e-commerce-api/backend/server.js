// Import necessary modules
import express from "express";   // Express framework for setting up the server
import cors from "cors";         // CORS to handle cross-origin requests from the frontend

const app = express();          // Initialize an Express app
app.use(cors());                // Enable CORS for cross-origin requests (React frontend)
app.use(express.json());        // Parse incoming JSON data in request bodies

// Mock in-memory data
let customers = [];
let products = [];
let orders = [];

// Route to create a new customer
app.post("/api/customers", (req, res) => {
  const { name, email, phone } = req.body;  // Destructure data from the request body
  const newCustomer = {
    id: Date.now(),  // Generate a unique ID using the current timestamp
    name,
    email,
    phone,
  };
  customers.push(newCustomer);  // Add the new customer to the array
  res.status(201).json(newCustomer);  // Send a response with the created customer data
});

// Route to create a new product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;  // Destructure product details from the request
  const newProduct = { id: Date.now(), name, price };  // Create the new product with a unique ID
  products.push(newProduct);  // Add the product to the array
  res.status(201).json(newProduct);  // Respond with the new product details
});

// Route to get customer details by ID
app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));  // Find customer by ID
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });  // If not found, return an error
  }
  res.json(customer);  // If found, return the customer data
});

// Route to get product details by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));  // Find product by ID
  if (!product) {
    return res.status(404).json({ message: "Product not found" });  // If not found, return an error
  }
  res.json(product);  // If found, return the product data
});

// Route to update customer information
app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));  // Find customer by ID
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });  // If not found, return an error
  }
  const { name, email, phone } = req.body;  // Get the new details from the request
  customer.name = name || customer.name;  // Update the customer's name if provided
  customer.email = email || customer.email;  // Update the customer's email if provided
  customer.phone = phone || customer.phone;  // Update the customer's phone if provided
  res.json(customer);  // Respond with the updated customer data
});

// Route to delete a customer by ID
app.delete("/api/customers/:id", (req, res) => {
  const customerId = req.params.id;  // Extract customer ID from the URL parameter
  const customerIndex = customers.findIndex((customer) => customer.id === customerId);  // Find the index of the customer

  if (customerIndex === -1) {
    return res.status(404).json({ message: "Customer not found" });  // If customer not found, return error
  }

  customers.splice(customerIndex, 1);  // Remove the customer from the array
  res.status(200).json({ message: "Customer deleted successfully" });  // Return success message
});

// Route to delete a product by ID
app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);  // Extract product ID from the URL parameter
  const productIndex = products.findIndex((product) => product.id === productId);  // Find the product index

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });  // If product not found, return error
  }

  products.splice(productIndex, 1);  // Remove the product from the array
  res.status(200).json({ message: "Product deleted successfully" });  // Return success message
});

// Route to get all products
app.get('/api/products', (req, res) => {
  res.json(products);  // Return the list of all products
});

// Route to get all customers
app.get('/api/customers', (req, res) => {
  res.json(customers);  // Return the list of all customers
});

// Route to place a new order
app.post('/api/orders', (req, res) => {
  const { customerId, productIds, orderDate } = req.body;  // Extract order data from the request body
  const newOrder = {
    id: Date.now(),  // Generate a unique order ID
    customerId,
    productIds,
    orderDate,
  };
  orders.push(newOrder);  // Add the new order to the orders array
  res.status(201).json(newOrder);  // Return the new order details in the response
});

// Start the server and listen for requests on port 5000
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");  // Log to confirm server is running
});
