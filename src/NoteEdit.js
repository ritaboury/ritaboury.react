import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect} from "react";

const currentDate = () => {
    const date = new Date();
    const res = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toJSON()
    .substring(0, 19);
    return res;
};

function NoteEdit() {
    
    const { noteNum } = useParams();
    const [notes, updateNote, deleteNote] = useOutletContext();

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [note, setNote] = useState("");

    useEffect(() => {
      if (notes[noteNum - 1]) {
        const { id, title, date, note } = notes[noteNum - 1];
        setId(id);
        setTitle(title);
        setDate(date);
        setNote(note);
      }
    }, [noteNum, notes]);

    const navigate = useNavigate();

    const handleSave = () => {
      
        const updatedNote = {
            id,
            title,
            date: date? date : currentDate(),
            note
        };
        updateNote && updateNote(updatedNote, noteNum - 1);
        navigate(`/notes/${noteNum}`);
        
    };

    const handleDelete = () => {
      const answer = window.confirm("Are you sure?");
        if (answer) {
          // call a function you get from Layout.js to delete
          deleteNote(noteNum-1);
          if (noteNum > 1) {
            navigate(`/notes/${noteNum - 1}`);
          } else if (notes.length === 1 || notes.length === 0) {
            navigate(`/notes`);
          } else {
            navigate(`/notes/1`);
          }
        }
    };

    const localDate = new Date(date.toLocaleString("en-US", {timeZone: "America/Denver"}).slice(0, -3));
    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const day = localDate.getDate().toString().padStart(2, '0');
    let hours = 0;
    if (localDate.getHours() < 12) {
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
                    value = {title || "Untitled"}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  
                />
                <input 
                    id = "date" 
                    type="datetime-local" 
                    value={date ? isoDate : currentDate()}
                    onChange={(e) => {
                      const dateValue = new Date(e.target.value);
                      setDate(dateValue);
                      
                    }}
                    />
                <span className = "sd-buttons"><p id = "save" onClick={()=>handleSave()}>Save</p> <p id = "delete" onClick={()=>handleDelete()}>Delete</p></span>
            </div>
            <div className = "edit-bar">
                <ReactQuill theme="snow" placeholder="Your Note Here"
                    value = {note? note: ""}
                    onChange={(content) => {
                        setNote(content);
                        
                    }}
                    />
            </div>
          </div>
        </>
    );
}
  
export default NoteEdit;
  