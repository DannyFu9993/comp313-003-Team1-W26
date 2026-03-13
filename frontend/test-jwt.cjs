const { jwtDecode } = require("jwt-decode");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjliNDFmNWQ1NmYwMDM5N2VlOGQzODBiIiwicm9sZSI6ImVtcGxveWVlIn0sImlhdCI6MTc3MzQxMjIwNCwiZXhwIjoxNzczNDE1ODA0fQ.4PfVIxmoeeEfeVTw4xc2bcz5fR9rskvIPR5SMB2Vm5k";
const decoded = jwtDecode(token);
console.log("Decoded:", decoded);
console.log("Role !== employee:", decoded.user.role !== "employee");
