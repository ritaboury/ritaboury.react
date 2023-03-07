import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from "react";

const currentDate = () => {
    const date = new Date();
    const res = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toJSON()
    .substring(0, 19);
    return res;
};

function NoteEdit({sideNotes, setSideNotes, noteNum, setNoteNum }) {
    const currentNote = JSON.parse(localStorage.getItem(noteNum));
    
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [note, setNote] = useState("");


    const [isEditable, setIsEditable] = useState(true);

    const navigate = useNavigate();

    // useEffect(() => {
    //     const currentNote = JSON.parse(localStorage.getItem(noteNum));
    //     setTitle(currentNote? currentNote.title : 'Untitled');
    //     setDate(currentNote.date !== ""? new Date(currentNote.date) : currentDate());
    //     setNote(currentNote? currentNote.note: '');
    // }, [noteNum]);

    const handleSave = () => {
        setIsEditable(false);
        const updatedNote = {
            ...currentNote,
            title,
            date: date,
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
              const updatedSideNotes = sideNotes.filter((note) => note.id !== currentNote.id);
              return updatedSideNotes;
            });
            setNoteNum(noteNum-1);
            if (noteNum > 1) {
              navigate(`/notes/${noteNum-1}`);
            } else {
              navigate(`/notes`);
            }
        }
    };

    const localDate = new Date(date.toLocaleString("en-US", {timeZone: "America/Denver"}).slice(0, -3));
    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const day = localDate.getDate().toString().padStart(2, '0');
    let hours = 0;
    if (localDate.getHours < 12) {
      hours = (localDate.getHours()+12).toString().padStart(2, '0');
    } else {
      hours = (localDate.getHours()).toString().padStart(2, '0');
    }
    const minutes = localDate.getMinutes().toString().padStart(2, '0');
    const isoDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    return (
      <>
        <div className = "main">
            <div className = "main-heading">
                <input 
                    id = "note-title"
                    value = {title}
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
                    value={date ? isoDate : currentDate()}
                    readOnly={!isEditable}
                    onChange={(e) => {
                      setDate(e.target.value);
                      const dateValue = new Date(e.target.value);
                      setDate(dateValue);
                        const updatedNote = {
                          ...currentNote,
                          date: dateValue !== currentDate() ? dateValue : currentDate(),
                        };
                        localStorage.setItem(noteNum, JSON.stringify(updatedNote));
                    }}
                    />
                <span className = "sd-buttons"><p id = "save" onClick={()=>handleSave()}>Save</p> <p id = "delete" onClick={()=>handleDelete()}>Delete</p></span>
            </div>
            <div className = "edit-bar">
                <ReactQuill theme="snow" placeholder="Your Note Here"
                    value = {note? note: ""}
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
  