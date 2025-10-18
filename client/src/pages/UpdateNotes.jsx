import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNotes = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  //   const [formData, setFormData] = useState({
  //     title: "",
  //     date: new Date().toISOString().split("T")[0],
  //     category: "",
  //     content: "",
  //     tags: "",
  //     priority: "Medium",
  //     reminder: "",
  //     status: "Draft",
  //     color: "#facc15", // Yellow
  //   });

  const [fetchedFormData, setFetchedFormData] = useState(null);

//   console.log("Fetched Form Data:", fetchedFormData);

  useEffect(() => {
    fetch(`http://localhost:5000/note/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Convert tags array to comma-separated string for the input field
        const tagsString = data.tags ? data.tags.join(", ") : "";
        const updatedData = { ...data, tags: tagsString };
        setFetchedFormData(updatedData);
        // console.log("Note data fetched for update:", data);
      })
      .catch((error) => {
        console.error("Error fetching note data:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedNote = Object.fromEntries(formData.entries());
    
    if (updatedNote.tags) {
      updatedNote.tags = updatedNote.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    }

    // console.log("Updated Note Data to be sent:", updatedNote);

    fetch(`http://localhost:5000/note/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Server response after update:", data);
        if (data.modifiedCount) {
          alert("নোট সফলভাবে আপডেট হয়েছে!");
          navigate("/notes", { replace: true });
        }
      })
      .catch((error) => {
        console.error("Error updating note on server:", error);
      });
  };

  // user loader here
  if (!fetchedFormData) {
    return <div>লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">📝 নোট আপডেট করুন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">শিরোনাম</label>
          <input
            type="text"
            name="title"
            defaultValue={fetchedFormData.title}
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
            defaultValue={fetchedFormData.date}
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">বিষয়</label>
          <input
            type="text"
            name="category"
            defaultValue={fetchedFormData.category}
            className="input input-bordered w-full"
            placeholder="যেমনঃ পড়াশোনা, কাজ, আইডিয়া"
          />
        </div>

        {/* Note Content */}
        <div>
          <label className="label">নোট</label>
          <textarea
            name="content"
            defaultValue={fetchedFormData.content}
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
            defaultValue={fetchedFormData.tags}
            className="input input-bordered w-full"
            placeholder="idea, urgent, project-x"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="label">গুরুত্ব</label>
          <select
            name="priority"
            defaultValue={fetchedFormData.priority}
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
            defaultValue={fetchedFormData.reminder}
            className="input input-bordered w-full"
          />
        </div>

        {/* Status */}
        <div>
          <label className="label">অবস্থা</label>
          <select
            name="status"
            defaultValue={fetchedFormData.status}
            className="select select-bordered w-full"
          >
            <option value="Draft">Draft</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Color Label */}
        <div>
          <label className="label">
            রঙ (Color Label): নোটস এর কালার সেট করুন:-{" "}
          </label>
          <input
            type="color"
            name="color"
            defaultValue={fetchedFormData.color}
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

export default UpdateNotes;
