import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddNotes = () => {
  const { user } = useAuth();
  const email = user?.email;
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    content: "",
    tags: "",
    priority: "Medium",
    reminder: "",
    status: "Draft",
    color: "#facc15", // Yellow
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };
    console.log("Form submitted:", processedData);
    // এখানে তুমি formData ব্যাকএন্ডে পাঠাতে পারো
    if (email) {
      fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...processedData, userEmail: email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Server response:", data);
          if (data.insertedId) {
            alert("নোট সফলভাবে সংরক্ষণ হয়েছে!");
            // ফর্ম রিসেট করা
            setFormData({
              title: "",
              date: new Date().toISOString().split("T")[0],
              category: "",
              content: "",
              tags: "",
              priority: "Medium",
              reminder: "",
              status: "Draft",
              color: "#facc15", // Yellow
            });
            Navigate("/notes", { replace: true });
          }
        })
        .catch((error) => {
          console.error("Error sending note to server:", error);
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">📝 নতুন নোট যুক্ত করুন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">শিরোনাম</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="নোটের শিরোনাম লিখুন"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="label">তারিখ</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">বিষয়</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="যেমনঃ পড়াশোনা, কাজ, আইডিয়া"
          />
        </div>

        {/* Note Content */}
        <div>
          <label className="label">নোট</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="এখানে নোট লিখুন..."
            rows={5}
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="label">ট্যাগ (কমা দিয়ে আলাদা করুন)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="idea, urgent, project-x"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="label">গুরুত্ব</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Reminder */}
        <div>
          <label className="label">রিমাইন্ডার</label>
          <input
            type="datetime-local"
            name="reminder"
            value={formData.reminder}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Status */}
        <div>
          <label className="label">অবস্থা</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Draft">Draft</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Color Label */}
        <div>
          <label className="label">রঙ (Color Label): নোটস এর কালার সেট করুন:- </label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-16 h-10 border-2 border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full">
            ✅ নোট সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotes;
