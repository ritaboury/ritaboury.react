import { useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";

function NoteSave() {

  const {noteNum} = useParams(); 

    const currentNote = JSON.parse(localStorage.getItem(noteNum));
    const [title, setTitle] = useState(currentNote.title);
    const [date, setDate] = useState(currentNote.date);
    const [note, setNote] = useState(currentNote.note);
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
            // setSideNotes(sideNotes => {
            //   const updatedSideNotes = sideNotes.filter((note) => note.id !== currentNote.id);
            //   return updatedSideNotes;
            // });
            // setNoteNum(noteNum-1);
            // if (noteNum > 1) {
            //   navigate(`/notes/${noteNum-2}`);
            // } else {
            //   navigate(`/notes`);
            // }
        }
    };

    const removeTags = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const textContent = doc.body.textContent;
        return textContent;
    }

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
      

    return (
      <>
        <div className= "main">
            <div className = "main-heading">
                <p id = "note-title" defaultValue={"Untitled"} readOnly ><b>{title}</b></p>
                <p id = "date" defaultValue={currentDate()} readOnly>{formatDate(date)}</p>
                <span className = "sd-buttons"><p id = "save" onClick={()=>editClicked()}>Edit</p> <p id = "delete" onClick={()=>handleDelete()}>Delete</p></span>
            </div>
            <div className = "edit-bar">
                <p id = "note-content" defaultValue={""} readOnly>{removeTags(note)}</p>
            </div>
          </div>

      </>
    );
  }
  
  export default NoteSave;