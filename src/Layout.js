import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import {NavLink, Outlet} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const localStorageKey = "notes";


function Layout() {
  const [sideNotes, setSideNotes] = useState([]);
    const navigate = useNavigate()
    const addClicked = () => {
      const newNote = {
        id: uuidv4(),
        title: 'Untitled',
        date: '',
        note: '',
      };
      setSideNotes([newNote, ...sideNotes]);
      localStorage.setItem(localStorageKey, JSON.stringify(sideNotes));
      // navigate(`/notes/${newNoteNum}/edit`)
    };

    const hideSide = ()=> {
        const side = document.getElementById("side");
        side.classList.toggle("hidden");
    }

    const MAX_CHARS = 20;

    const updateNote = (newNote, noteId) => {
      // update the sideNotes array at the noteId index and replace it with newNote
    }

    useEffect(() => {
      window.addEventListener("beforeunload", clearLocalStorage);
    
      return () => {
        window.removeEventListener("beforeunload", clearLocalStorage);
      };
    }, []);
    
    const clearLocalStorage = () => {
      window.localStorage.clear();
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
      <header>
        <span className = "icon" onClick={hideSide}><p id="menu-icon">&#9776;</p> </span>
        <h1>Lotion</h1>
        <h5 id="caption">Like Notion, but worse.</h5>
      </header>
      <div className = "body">
        <div className="flex-container">
          <div className = "side" id = "side">
            <div className = "side-head">
              <h2>Notes</h2>
              <h2 id="add" onClick={addClicked}>+</h2>
            </div>
            <div className= "side-body">
              {sideNotes.length === 0 ? (
                <p id = "no-note">No Note Yet</p>
              ) : (
                <ul className = "note-tags">
                  {sideNotes.map((element, noteNum) => (
                    <li key={element.id} className = "note-tag">
                      <NavLink to = {`/notes/${noteNum+1}`}>
                        <h3>{element.title}</h3>
                        <small>{formatDate(element.date)}</small>
                        <p dangerouslySetInnerHTML={{__html: `${element.note.slice(0, MAX_CHARS)}...`}}/>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className= "main" >
            
              <Outlet context={[sideNotes, updateNote]} />
           
          </div>
        </div>
      </div>
      </>
    )

}

export default Layout;