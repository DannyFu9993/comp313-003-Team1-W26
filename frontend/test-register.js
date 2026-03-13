const fetch = require("node-fetch");
fetch("http://localhost:5001/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "test_employee_2",
    email: "test_employee_2@example.com",
    password: "password123",
    role: "employee" // frontend sends this exactly
  })
}).then(res => res.json()).then(console.log);
