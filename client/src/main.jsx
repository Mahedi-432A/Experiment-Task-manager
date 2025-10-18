import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Tasks from "./pages/Tasks.jsx";
import Notes from "./pages/Notes.jsx";
import LogIn from "./pages/LogIn.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import ProtectedLayout from "./layout/ProtectedLayout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AddNotes from "./pages/AddNotes.jsx";
import UpdateNotes from "./pages/UpdateNotes.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // loader: loadRootData,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <LogIn></LogIn> },
      { path: "/register", element: <Register></Register> },
      {
        element: <ProtectedLayout></ProtectedLayout>,
        children: [
          { path: "/tasks", element: <Tasks></Tasks> },
          { path: "/notes", element: <Notes></Notes> },
          { path: "/addNotes", element: <AddNotes></AddNotes>},
          { path: "/updateNote/:id", element: <UpdateNotes></UpdateNotes>},
          // { path: "/dashboard", element: <Dashboard></Dashboard> }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
