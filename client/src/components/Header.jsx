import { MdOutlineNoteAlt } from "react-icons/md";
import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 py-10 text-center text-white">
      <div className="flex flex-col items-center justify-center">
        <MdOutlineNoteAlt className="text-5xl mb-2" />
        <h1 className="text-3xl font-bold">Notes App</h1>
        <p className="text-lg mt-1">Keep your thoughts organized</p>
      </div>
    </header>
  );
};

export default Header;

