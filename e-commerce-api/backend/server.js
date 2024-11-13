// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());  // Enable CORS to allow requests from the React frontend
app.use(express.json());  // Parse JSON bodies

// Mock data for customers (You would replace this with a database in production)
let customers = [];

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

// Get customer details by ID
app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.json(customer);
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


// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
