// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());  // Enable CORS to allow requests from the React frontend
app.use(express.json());  // Parse JSON bodies

// Mock data for customers (You would replace this with a database in production)
let customers = [];
let products = []

// Create a new customer
app.post("/api/customers", (req, res) => {
  const { name, email, phone } = req.body;
  const newCustomer = {
    id: Date.now(), // Simple ID generator
    name,
    email,
    phone,
  };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);  // Respond with the new customer data
});

// Product routes
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: Date.now(), name, price }; // Automatically generate a unique ID
  products.push(newProduct);
  res.status(201).json(newProduct);  // Return the created product along with its ID
});



// Get customer details by ID
app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.json(customer);
});

// Get product details by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});



// Update customer information
app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  const { name, email, phone } = req.body;
  customer.name = name || customer.name;
  customer.email = email || customer.email;
  customer.phone = phone || customer.phone;
  res.json(customer);
});

// Delete customer
app.delete("/api/customers/:id", (req, res) => {
  const customerId = req.params.id;

  // Logic to delete the customer from the database (or mock data)
  const customerIndex = customers.findIndex((customer) => customer.id === customerId);

  if (customerIndex === -1) {
    return res.status(404).json({ message: "Customer not found" });
  }

  // Remove the customer from the list (or database)
  customers.splice(customerIndex, 1);  // Modify this according to your storage method

  res.status(200).json({ message: "Customer deleted successfully" });
});

app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const productIndex = products.findIndex((product) => product.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Remove the product from the array
  products.splice(productIndex, 1);

  res.status(200).json({ message: "Product deleted successfully" });
});




// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
