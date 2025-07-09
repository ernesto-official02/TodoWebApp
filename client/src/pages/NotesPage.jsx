import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Header from "./components/Header.jsx";
import AddNote from "./components/AddNote";
import AllNotes from "./components/AllNotes";
import Footer from "./components/Footer";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Load notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get("/notes");
        setNotes(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notes:", err);
        navigate("/login");
      }
    };
    fetchNotes();
  }, []);

  // ✅ Add or update note
  const handleAddNote = async (note) => {
    try {
      if (editIndex !== null) {
        const noteId = notes[editIndex]._id;
        const updated = await API.put(`/notes/${noteId}`, {
          ...note,
          timestamp: new Date().toLocaleString(),
        });

        const newNotes = [...notes];
        newNotes[editIndex] = updated.data;
        setNotes(newNotes);
        setEditIndex(null);
      } else {
        const res = await API.post("/notes", note);
        setNotes([res.data, ...notes]);
      }
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  // ✅ Delete note
  const handleDelete = async (index) => {
    try {
      const id = notes[index]._id;
      await API.delete(`/notes/${id}`);
      const newNotes = [...notes];
      newNotes.splice(index, 1);
      setNotes(newNotes);
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // ✅ Mark note as complete
  const handleComplete = async (index) => {
    try {
      const id = notes[index]._id;
      const res = await API.put(`/notes/${id}`, {
        ...notes[index],
        completed: true,
      });
      const updatedNotes = [...notes];
      updatedNotes[index] = res.data;
      setNotes(updatedNotes);
    } catch (err) {
      console.error("Error completing note:", err);
    }
  };

  // ✅ Edit mode
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <div className="text-center mt-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <AddNote onAdd={handleAddNote} editNote={editIndex !== null ? notes[editIndex] : null} />
      {!loading ? (
        <AllNotes
          notes={notes}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onComplete={handleComplete}
        />
      ) : (
        <p className="text-center mt-10">Loading your notes...</p>
      )}
      <Footer />
    </div>
  );
};

export default NotesPage;
