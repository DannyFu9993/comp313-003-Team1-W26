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

        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Navigate based on role
        const normalizedRole = String(res.data.user.role || "").toLowerCase();
        if (normalizedRole === "employee" || normalizedRole === "admin") {
          navigate("/admin-dashboard");
          return;
        }
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
  <div className="login-card">
    <h2>Login</h2>

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
      Are you an employee? <a href="/employee-login">Login here</a>
    </p>
  </div>
</div>
  );
};

export default Login;
