import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();

  const email = user?.email;
  const [name, setName] = React.useState("");
  const [photo, setPhoto] = React.useState("");

  useEffect (() => {
    if (email) {
      fetch(`http://localhost:5000/user/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setPhoto(data.photo);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [email]);
  
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {user && (
              <>
                <li>
                  <Link to="tasks">Tasks</Link>
                </li>
                <li>
                  <Link to="addTasks">Add Tasks</Link>
                </li>
                <li>
                  <Link to="notes">Notes</Link>
                </li>
                <li>
                  <Link to="addNotes">Add Notes</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Task Manager</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user && (
              <>
                <li>
                  <Link to="tasks">Tasks</Link>
                </li>
                <li>
                  <Link to="addTasks">Add Tasks</Link>
                </li>
                <li>
                  <Link to="notes">Notes</Link>
                </li>
                <li>
                  <Link to="addNotes">Add Notes</Link>
                </li>
              </>
            )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (<>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <p>
                {user.email}
                {/* <span className="badge">New</span> */}
              </p>
            </li>
            <li>
              <p>{name}</p>
            </li>
            <li>
              <a onClick={() => logout()}>Logout</a>
            </li>
          </ul>
        </div>
        </>) : (<>
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-primary ml-2">Register</Link>
        </>)}
      </div>
    </div>
  );
};

export default Navbar;
