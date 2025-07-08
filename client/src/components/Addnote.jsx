import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const AddNote = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) return;
    onAdd({ title, content });
    setTitle("");
    setContent("");
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-8">
      <input
        type="text"
        placeholder="Note Title"
        className="w-full border border-gray-500 rounded px-4 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note here..."
        rows="5"
        className="w-full border border-gray-300 rounded px-4 py-2 mb-8 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end gap-3">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          <FaPlus /> Add Note
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          <FaTrash /> Clear
        </button>
      </div>
    </div>
  );
};

export default AddNote;
