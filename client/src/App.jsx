import React from "react"
import './index.css';
import './App.css';
import { useState } from "react";
import Header from "./components/header";
import AddNote from "./components/Addnote";
import AllNotes from "./components/Allnotes";
import Footer from "./components/footer";


function App() {
 const [notes , setNotes]=useState([]);

 const handleAddNote =(note)=>{
  setNotes([note, ...notes]);
 };

 

 const addNote = (note) => {
    const timestamp = new Date().toLocaleString();
    setNotes([{ ...note, completed: false, timestamp }, ...notes]);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    const toEdit = notes[index];
    const updatedTitle = prompt("Edit title", toEdit.title);
    const updatedContent = prompt("Edit content", toEdit.content);

    if (updatedTitle !== null && updatedContent !== null) {
      const updatedNotes = [...notes];
      updatedNotes[index] = {
        ...updatedNotes[index],
        title: updatedTitle,
        content: updatedContent,
      };
      setNotes(updatedNotes);
    }
  };

  const completeNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].completed = true;
    setNotes(updatedNotes);
  };


  return (
    <>
     <Header/>
     <AddNote onAdd={handleAddNote} />
     <AllNotes 
     notes ={notes} 
     onDelete={deleteNote}
     onEdit={editNote}
     onComplete={completeNote}
     />
     <Footer />
    </>
  )
}

export default App
