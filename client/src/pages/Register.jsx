import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
import { useAuth } from "../contexts/AuthProvider";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      // Firebase auto signs in after createUserWithEmailAndPassword by default,
      // তাই এখনই রিডিরেক্ট করলেই হবে
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("রেজিস্টার ব্যর্থ: " + err.message);
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

        <legend className="fieldset-legend">Register</legend>

        <label className="label">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="input" type="email" placeholder="Email" required />

        <label className="label">Password</label>
        <input value={password} className="input" onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required />

        <button type="submit" className="btn btn-neutral mt-4">Register</button>
      </form>

      <p className="mt-4">
        আগেই রেজিস্টার করেছেন?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
