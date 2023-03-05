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

function NoteEdit({sideNotes, setSideNotes, noteNum, setNoteNum }) {
    const currentNote = JSON.parse(localStorage.getItem(noteNum));
    const currentId = currentNote.id;
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');


    const [isEditable, setIsEditable] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setTitle(currentNote.title || '');
        setDate(currentNote.date || currentDate());
        setNote(currentNote.note || '');
    }, [currentNote]);

    const handleSave = () => {
        setIsEditable(false);
        const updatedNote = {
            ...currentNote,
            title,
            date,
            note
          };
          localStorage.setItem(noteNum, JSON.stringify(updatedNote));
          setSideNotes(sideNotes => {
            const updatedSideNotes = [...sideNotes];
            updatedSideNotes[noteNum] = updatedNote;
            return updatedSideNotes;
          });
        navigate(`/notes/${noteNum}`);
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
            if (noteNum > 0) {
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
                        localStorage.setItem(currentNote.title, JSON.stringify(e.target.value));
                    }}
                />
                <input 
                    id = "date" 
                    type="datetime-local" 
                    defaultValue={date ? date : currentDate()}
                    readOnly={!isEditable}
                    onChange={(e) => {
                        setDate(e.target.value);
                        const dateValue = e.target.value;
                        localStorage.setItem(currentNote.date, dateValue !== currentDate() ? dateValue : null);
                    }}
                    />
                <span class = "sd-buttons"><p id = "save" onClick={handleSave}>Save</p> <p id = "delete" onClick={handleDelete}>Delete</p></span>
            </div>
            <div class = "edit-bar">
                <ReactQuill theme="snow" placeholder="Your Note Here"
                    readOnly={!isEditable}
                    onChange={(content) => {
                        setNote(content);
                        localStorage.setItem(currentNote.note, JSON.stringify(content));
                    }}
                    />
            </div>
          </div>
        </>
    );
  }
  
export default NoteEdit;
  