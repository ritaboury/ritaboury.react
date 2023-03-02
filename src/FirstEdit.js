import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from "react";

const currentDate = () => {
    const date = new Date();
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toJSON()
        .substring(0, 19);
};

function FirstEdit() {
    const title = localStorage.getItem('title');
    const date = localStorage.getItem('date');
    const note = localStorage.getItem('note');

    const navigate = useNavigate();
    const addClicked = ()=> {
        navigate(`/notes/1`);
    }
    const hideSide = ()=> {
        const side = document.getElementById("side");
        side.classList.toggle("hidden");
    }

    const [isEditable, setIsEditable] = useState(true);

    const handleSave = () => {
        setIsEditable(false);
        navigate(`/notes/1`);
    };

    const handleDelete = () => {
        const answer = window.confirm("Are you sure?");
        if (answer) {
            localStorage.setItem('title', "");
            localStorage.setItem('date', "");
            localStorage.setItem('note', "");
            navigate(`/notes`);
        }
    };

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
          <div class = "main">
            <div class = "main-heading">
                <input 
                    id = "note-title"
                    defaultValue = {title || "Untitled"}
                    readOnly={!isEditable}
                    onChange={(e) => {
                        localStorage.setItem('title', e.target.value);
                    }}
                />
                <input 
                    id = "date" 
                    type="datetime-local" 
                    defaultValue={date ? date : currentDate()}
                    readOnly={!isEditable}
                    onChange={(e) => {
                        localStorage.setItem('date', e.target.value);
                    }}
                    />
                <span class = "sd-buttons"><p id = "save" onClick={handleSave}>Save</p> <p id = "delete" onClick={handleDelete}>Delete</p></span>
            </div>
            <div class = "edit-bar">
                <ReactQuill theme="snow" placeholder="Your Note Here"
                    value={note}
                    readOnly={!isEditable}
                    onChange={(content) => {
                        localStorage.setItem('note', content);
                    }}
                    />
            </div>
          </div>
        </div>
      </body>
      </>
    );
  }
  
export default FirstEdit;
  