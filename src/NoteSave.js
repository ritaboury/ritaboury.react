import { useNavigate, useOutletContext, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

function NoteSave() {

  const {noteNum} = useParams(); 
  const [notes, updateNote, deleteNote] = useOutletContext();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const currentDate = () => {
        const date = new Date();
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toJSON()
            .substring(0, 19);
    };

    const navigate = useNavigate();
    

    useEffect(()=> {
      // runs once the component is loaded
      // check and see if notes[noteNum] exists
      // if it does, update title, date, and note to whatever you get from notes[noteNum]
      // if noteNum is 1, you need to check the 0 position. 
      if (notes[noteNum-1]) {
        setTitle(notes[noteNum-1].title);
        setDate(notes[noteNum-1].date);
        setNote(notes[noteNum-1].note);
      }
    }, [noteNum, notes])

    const editClicked = ()=> {
        navigate(`/notes/${noteNum}/edit`);
    }

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
                <p id = "note-content" defaultValue={""} readOnly dangerouslySetInnerHTML={{ __html: `${note}` }}></p>
            </div>
          </div>

      </>
    );
  }
  
  export default NoteSave;