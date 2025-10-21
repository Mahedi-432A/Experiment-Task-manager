import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import { useAuth } from "../contexts/AuthProvider.jsx";
// import fakeTasks from "../data/fakeTask.js";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userEmail = user?.email;

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/tasks/${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching tasks:", err);
          setLoading(false);
        });
    }

    // setLoading(true);
    // setTimeout(() => {
    //   setTasks(fakeTasks);
    //   setLoading(false);
    //   console.log("set kora task", tasks);
    //   console.log("facke task", fakeTasks);
    // }, 500);
  }, [userEmail]);


  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Tasks</h1>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No tasks found. Try adding some tasks!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              tasks = {tasks}
              setTasks = {setTasks}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
