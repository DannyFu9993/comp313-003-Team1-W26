import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeLogin.css"; // Assuming you have a login css file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);

      // Store user role in localStorage as a backup
      if (res.data.user) {
        localStorage.setItem("userRole", res.data.user.role);

        // Navigate based on role
        if (res.data.user.role === "employee") {
          navigate("/employee-home");
          return;
        }
      }

      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: "20px" }}>
        Are you an employee? <a href="/employee-login">Login here</a>
      </p>
    </div>
  );
};

export default Login;
