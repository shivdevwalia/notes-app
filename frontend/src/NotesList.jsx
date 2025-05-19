import React from "react";

const NotesList = ({ notes }) => {
  if (!Array.isArray(notes)) {
    return <p>Notes data is not available.</p>;
  }

  if (notes.length === 0) {
    return <p>No notes to show.</p>;
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note._id}>
          <strong>
            {note.title}: {note.body}
          </strong>
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
