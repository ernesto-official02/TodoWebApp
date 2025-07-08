import { useState } from "react";
import { FaSearch, FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const AllNotes = ({ notes = [], onDelete, onEdit, onComplete }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && !note.completed) ||
      (filter === "Completed" && note.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Notes</h2>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute right-3 top-3 text-gray-500" />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 justify-center mb-4">
        {["All", "Active", "Completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded border ${
              filter === type
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-600">No notes found. Add your first note!</p>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note, index) => (
            <div
              key={index}
              className="flex justify-between items-start border border-gray-200 p-4 rounded shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className={`text-md font-semibold ${note.completed ? "line-through text-gray-400" : "text-blue-600"}`}>
                  {note.title}
                </h3>
                <p className={`text-gray-800 mt-1 ${note.completed ? "line-through text-gray-400" : ""}`}>
                  {note.content}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {note.timestamp || new Date().toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2 items-center ml-4 mt-1">
                <button
                  onClick={() => onDelete(index)}
                  className="bg-gray-100 p-2 rounded hover:bg-gray-200"
                  title="Delete"
                >
                  <FaTrash className="text-gray-600" />
                </button>
                <button
                  onClick={() => onEdit(index)}
                  className="bg-gray-100 p-2 rounded hover:bg-gray-200"
                  title="Edit"
                >
                  <FaEdit className="text-gray-600" />
                </button>
                {!note.completed && (
                  <button
                    onClick={() => onComplete(index)}
                    className="bg-green-500 p-2 rounded hover:bg-green-600"
                    title="Mark as Complete"
                  >
                    <FaCheck className="text-white" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllNotes;
