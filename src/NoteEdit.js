import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from "react";

const currentDate = () => {
    const date = new Date();
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toJSON()
        .substring(0, 19);
};

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const formatDate = (when) => {
  const formatted = new Date(when).toLocaleString("en-US", options);
  if (formatted === "Invalid Date") {
      return "";
  }
  return formatted;
};

function NoteEdit({sideNotes, setSideNotes, noteNum, setNoteNum }) {
    const currentNote = JSON.parse(localStorage.getItem(noteNum));
    
    const [title, setTitle] = useState(currentNote.title);
    const [date, setDate] = useState(currentNote.date);
    const [note, setNote] = useState(currentNote.note);


    const [isEditable, setIsEditable] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setTitle(currentNote.title || 'Untitled');
        setDate(currentNote.date || currentDate());
        setNote(currentNote.note || '');
    }, [currentNote]);

    const handleSave = () => {
        setIsEditable(false);
        const updatedNote = {
            ...currentNote,
            title,
            date: formatDate(date),
            note
        };
        localStorage.setItem(noteNum, JSON.stringify(updatedNote));
        setSideNotes(sideNotes => {
            const updatedSideNotes = [...sideNotes];
            const noteIndex = updatedSideNotes.findIndex(
              (note) => note.id === currentNote.id
            );
            if (noteIndex !== -1) {
              updatedSideNotes[noteIndex] = updatedNote;
            }
            return updatedSideNotes;
        });
        if (noteNum > 0) {
          navigate(`/notes/${noteNum}`);
        } else {
          navigate(`/notes`);
        }
    };

    const handleDelete = () => {
        const answer = window.confirm("Are you sure?");
        if (answer) {
            localStorage.removeItem(noteNum);
            setSideNotes(sideNotes => {
              const updatedSideNotes = [...sideNotes];
              updatedSideNotes.splice(noteNum, 1);
              return updatedSideNotes;
            });
            setNoteNum(noteNum-1);
            if (noteNum > 1) {
              navigate(`/notes/${noteNum-1}`);
            } else {
              navigate('/notes');
            }
        }
    };


    return (
      <>
        <div class = "main">
            <div class = "main-heading">
                <input 
                    id = "note-title"
                    defaultValue = {title || "Untitled"}
                    readOnly={!isEditable}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        const updatedNote = {
                          ...currentNote,
                          title: e.target.value,
                      };
                        localStorage.setItem(noteNum, JSON.stringify(updatedNote));
                    }}
                />
                <input 
                    id = "date" 
                    type="datetime-local" 
                    value={date ? date : currentDate()}
                    readOnly={!isEditable}
                    onChange={(e) => {
                        setDate(e.target.value);
                        const dateValue = e.target.value;
                        const updatedNote = {
                          ...currentNote,
                          date: dateValue !== currentDate() ? dateValue : currentDate(),
                        };
                        localStorage.setItem(noteNum, JSON.stringify(updatedNote));
                    }}
                    />
                <span class = "sd-buttons"><p id = "save" onClick={handleSave}>Save</p> <p id = "delete" onClick={handleDelete}>Delete</p></span>
            </div>
            <div class = "edit-bar">
                <ReactQuill theme="snow" placeholder="Your Note Here"
                    readOnly={!isEditable}
                    onChange={(content) => {
                        setNote(content);
                        const updatedNote = {
                          ...currentNote,
                          note: content,
                        };
                        localStorage.setItem(noteNum, JSON.stringify(updatedNote));
                    }}
                    />
            </div>
          </div>
        </>
    );
  }
  
export default NoteEdit;
  