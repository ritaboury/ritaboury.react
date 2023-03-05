import { useNavigate} from "react-router-dom";
import React, {} from "react";

function NoteSave({sideNotes, setSideNotes, noteNum, setNoteNum }) {

    const currentNote = JSON.parse(localStorage.getItem(noteNum));
    const currentId = currentNote.id;
    const title = currentNote.title;
    const date = currentNote.date;
    const note = currentNote.note;

    const newNote = {
        id: noteNum,
        title: title,
        date: date,
        note: note,
      };
    setSideNotes([newNote, ...sideNotes]);


    const currentDate = () => {
        const date = new Date();
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toJSON()
            .substring(0, 19);
    };

    const navigate = useNavigate();
    
    const editClicked = ()=> {
        navigate(`/notes/${noteNum}/edit`);
    }

    const handleDelete = () => {
        const answer = window.confirm("Are you sure?");
        if (answer) {
            localStorage.setItem(title, "");
            localStorage.setItem(date, "");
            localStorage.setItem(note, "");
            navigate(`/notes`);
        }
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

    const removeTags = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const textContent = doc.body.textContent;
        return textContent;
    }
      

    return (
      <>
        <div class= "main">
            <div class = "main-heading">
                <p id = "note-title" defaultValue={"Untitled"} readOnly ><b>{title}</b></p>
                <p id = "date" defaultValue={currentDate()} readOnly>{formatDate(date)}</p>
                <span class = "sd-buttons"><p id = "save" onClick={editClicked}>Edit</p> <p id = "delete" onClick={handleDelete}>Delete</p></span>
            </div>
            <div class = "edit-bar">
                <p id = "note-content" defaultValue={""} readOnly>{removeTags(note)}</p>
            </div>
          </div>

      </>
    );
  }
  
  export default NoteSave;