import { Link } from "react-router-dom";

const NoteCard = ({ note, notes, setNotes }) => {
  const {
    _id,
    title,
    date,
    category,
    content,
    tags,
    priority,
    reminder,
    status,
    color,
  } = note;

  const tagColors = [
    { bg: "bg-blue-100", text: "text-blue-800" },
    { bg: "bg-green-100", text: "text-green-800" },
    { bg: "bg-purple-100", text: "text-purple-800" },
    { bg: "bg-pink-100", text: "text-pink-800" },
    { bg: "bg-yellow-100", text: "text-yellow-800" },
  ];

  const handleDelete = (id) => {
    let confirmDelete = confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      fetch(`http://localhost:5000/note/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Server responded with ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.deletedCount) {
            alert("Note deleted successfully.");
            // window.location.reload();
            const remainingNotes = notes.filter((note) => note._id !== id);
            setNotes(remainingNotes);
          }
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
          alert("Failed to delete the note. Please try again.");
        });
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 pt-2 border-t-8 break-inside-avoid"
      style={{ borderTopColor: color }}
    >
      <div className="flex justify-end items-start mb-3 gap-2">
        <Link to={`/updateNote/${_id}`}>
          <button className="cursor-pointer">📝</button>
        </Link>
        <button onClick={() => handleDelete(_id)} className="cursor-pointer">
          🗑️
        </button>
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            status === "Completed"
              ? "bg-green-100 text-green-800"
              : status === "In Progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        {new Date(date).toLocaleDateString("bn-BD")}
      </p>

      {category && (
        <p className="text-sm text-gray-600 mb-2">
          <strong>বিষয়:</strong> {category}
        </p>
      )}
      <p className="text-gray-700 mb-4">{content}</p>

      {tags && tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1">
          {tags.map((tag, index) => {
            const color = tagColors[index % tagColors.length]; // Rotate colors
            return (
              <span
                key={index}
                className={`text-xs font-medium px-2 py-1 rounded-full ${color.bg} ${color.text}`}
              >
                #{tag}
              </span>
            );
          })}
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          📌 <strong>Priority:</strong> {priority}
        </span>
        {reminder && (
          <span>⏰ {new Date(reminder).toLocaleString("bn-BD")}</span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
