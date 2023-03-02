import { useNavigate} from "react-router-dom";
import React, {} from "react";

function FirstNote() {
    const navigate = useNavigate();
    const addClicked = ()=> {
        navigate(`/notes/1`);
    }
    const editClicked = ()=> {
        navigate(`/notes/1/edit`);
    }
    const hideSide = ()=> {
        const side = document.getElementById("side");
        side.classList.toggle("hidden");
    }

    const handleDelete = () => {
        const answer = window.confirm("Are you sure?");
        if (answer) {
            localStorage.setItem('title', "");
            localStorage.setItem('date', "");
            localStorage.setItem('note', "");
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
      

    const title = localStorage.getItem('title');
    const date = localStorage.getItem('date');
    const note = localStorage.getItem('note');

    return (
      <>
      <header>
        <span class = "icon" onClick={hideSide}><p id="menu-icon">&#9776;</p> </span>
        <h1>Lotion</h1>
        <h5 id="caption">Like Notion, but worse.</h5>
      </header>
      <body>
        <div class="flex-container">
          <div class = "side" id = "side">
            <div class = "side-head">
              <h2>Notes</h2>
              <h2 id="add" onClick={addClicked}>+</h2>
            </div>
            <div class= "side-body">
                <div class = "current-note-tag">
                    <p>Untitled<br /><br />...</p>
                </div>
            </div>
          </div>
          <div class= "main">
            <div class = "main-heading">
                <p id = "note-title" defaultValue={"Untitled"} readOnly ><b>{title}</b></p>
                <p id = "date" defaultValue={""} readOnly>{formatDate(date)}</p>
                <span class = "sd-buttons"><p id = "save" onClick={editClicked}>Edit</p> <p id = "delete" onClick={handleDelete}>Delete</p></span>
            </div>
            <div class = "edit-bar">
                <p id = "note-content" defaultValue={""} readOnly>{removeTags(note)}</p>
            </div>
          </div>
        </div>
      </body>

      </>
    );
  }
  
  export default FirstNote;
  