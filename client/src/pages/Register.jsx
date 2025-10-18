import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
import { useAuth } from "../contexts/AuthProvider";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password)
        .then((response) => {
          const user = response.user;
          // console.log("User registered:", user);

          const lastSignInTime = user.metadata.lastSignInTime;

          const userInfo = { name, email, photo, lastSignInTime };
          // console.log("User info to store:", userInfo);

          // এখন সার্ভারে ইউজারের ডাটা পাঠানো যাক
          return fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInfo }),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log("Server response:", data);
              if (data.insertedId) {
                alert("রেজিস্টার সফল হয়েছে!");
              }
            })
            .catch((serverError) => {
              console.error("Error sending user data to server:", serverError);
            });
        })
        .catch((error) => {
          console.error("Error during registration:", error);
          throw error;
        });
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
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Register</legend>

        <label className="label">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          type="text"
          placeholder="Name"
          required
        />

        <label className="label">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          type="email"
          placeholder="Email"
          required
        />

        <label className="label">Password</label>
        <input
          value={password}
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />

        <label className="label">Image Url</label>
        <input
          value={photo}
          className="input"
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Image Url"
          type="text"
          required
        />

        <button type="submit" className="btn btn-neutral mt-4">
          Register
        </button>
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
