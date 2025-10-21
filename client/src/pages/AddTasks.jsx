import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

const AddTasks = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
    category: "",
    tags: "",
    reminder: "",
    color: "#3b82f6",
  });

  const { user } = useAuth();
  const userEmail = user?.email;
  const navigate = useNavigate();

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      alert("Please enter a task title!");
      return;
    }

    const processedData = {
      ...task,
      tags: task.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    
        category: task.category
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat !== ""),
    };

    if (userEmail) {
      fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...processedData, userEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Server response:", data);
          if (data.insertedId) {
            alert("Task added successfully!");
            navigate("/tasks", { replace: true });

            // ফর্ম রিসেট করা হচ্ছে
            setTask({
              title: "",
              description: "",
              priority: "Medium",
              status: "Pending",
              dueDate: "",
              category: "",
              tags: "",
              reminder: "",
              color: "#3b82f6",
            });
          }
        })
        .catch((error) => {
          console.error("Error adding task:", error);
          alert("Failed to add task. Please try again.");
        });
    }

    // parent-এ পাঠানো হচ্ছে
    // onAddTask(task);
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-200 p-6 rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Add New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Write task details..."
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>

        {/* Priority, Status, Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={task.category}
              onChange={handleChange}
              placeholder="Work, Study..."
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Due Date, Reminder, Color */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Reminder</label>
            <input
              type="datetime-local"
              name="reminder"
              value={task.reminder}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Label Color</label>
            <input
              type="color"
              name="color"
              value={task.color}
              onChange={handleChange}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <input
            type="text"
            name="tags"
            value={task.tags}
            onChange={handleChange}
            placeholder="e.g. frontend, urgent"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full md:w-1/2">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTasks;
