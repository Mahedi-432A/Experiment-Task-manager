import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const UpdateTasks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState();

  useEffect(() => {
    fetch(`https://task-manager-v1-one.vercel.app/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const tagsString = data.tags ? data.tags.join(", ") : "";
        const categoryString = data.category ? data.category.join(", ") : "";

        const updatedData = { ...data, tags: tagsString, category: categoryString };
        setTask(updatedData);

        // if(data.modifiedCount){
        //     alert("Data Updated Successfully!!");
        //     navigate("/tasks", {replace: true});
        // }
      })
      .catch((err) => {
        console.error("Error in updating Tasks", err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedTask = Object.fromEntries(formData.entries());

    if (updatedTask.tags) {
      updatedTask.tags = updatedTask.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    }

    if (updatedTask.category) {
      updatedTask.category = updatedTask.category
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat !== "");
    }

    fetch(`https://task-manager-v1-one.vercel.app/task/${id}`, {
        method : "PUT",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.modifiedCount){
            alert("TASK সফলভাবে আপডেট হয়েছে!");
          navigate("/tasks", { replace: true });
        }
    })
    .catch((err) => {
        console.log(err);
        alert("failed to update........../");
    })
  };

  if (!task) {
    return <div>Loading task data...</div>;
  }

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
            defaultValue={task.title}
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
            defaultValue={task.description}
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
              defaultValue={task.priority}
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
              defaultValue={task.status}
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
              defaultValue={task.category}
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
              defaultValue={task.dueDate}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Reminder</label>
            <input
              type="datetime-local"
              name="reminder"
              defaultValue={task.reminder}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Label Color</label>
            <input
              type="color"
              name="color"
              defaultValue={task.color}
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
            defaultValue={task.tags}
            placeholder="e.g. frontend, urgent"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full md:w-1/2">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTasks;
