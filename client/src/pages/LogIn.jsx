import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true }); // পূর্বের পেজে ফিরিয়ে দাও
    } catch (err) {
      console.error(err);
      alert("লগইন ব্যর্থ: " + err.message);
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="input"
          required
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="Password"
          required
        />

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>
      </form>
      <p className="mt-4">
        নতুন নতুন ?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LogIn;
