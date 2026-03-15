import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeLogin.css";

const EmployeeLogin = () => {
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

      if (res.data.user) {
        localStorage.setItem("userRole", res.data.user.role);
        if (res.data.user.role !== "employee") {
          setError("Access Denied: This is not an employee account.");
          return;
        }
      }

      navigate("/employee-home");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials");
      }
      console.error(err);
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">
      <h2>Employee Login</h2>

      <form onSubmit={onSubmit}>
        {error && <p className="error-message">{error}</p>}

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

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <p className="login-footer">
        Not an employee? <a href="/login">User login</a>
      </p>
    </div>
  </div>
  );
};

export default EmployeeLogin;
