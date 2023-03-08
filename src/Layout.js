import React, { useEffect, useRef, useState } from "react";
import { useNavigate} from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const localStorageKey = "notes";


function Layout() {

  // once this component comes up, read the localStorage
  // if anything is there, put it in the sideNotes: setSideNotes(existing)

  // any time you update the sideNotes state, update localStorage as well
  const [showOutlet, setShowOutlet] = useState(false);
  const existing = JSON.parse(localStorage.getItem(localStorageKey));

  const [sideNotes, setSideNotes] = useState([]);

  useEffect(() => {
    if (existing) {
      setSideNotes(existing);
    }
  }, []);

  //const navigate = useNavigate()
  const addClicked = () => {
    const newNote = {
      id: uuidv4(),
      title: 'Untitled',
      date: '',
      note: '',
    };
    setSideNotes([newNote, ...sideNotes]);
    setShowOutlet(true);

  };

  const hideSide = () => {
    const side = document.getElementById("side");
    side.classList.toggle("hidden");
  }

  const MAX_CHARS = 20;

  const updateNote = (newNote, noteId) => {
    // update the sideNotes array at the noteId index and replace it with newNote
    const updatedNotes = sideNotes.map((note, index) => {
      if (index === noteId) {
        return newNote;
      } else {
        return note;
      }
    });
    setSideNotes(updatedNotes);
  }

  const deleteNote = (noteId) => {
    // delete note at noteId
    const filteredNotes = sideNotes.filter((note, index) => {
      return index !== noteId;
    });
    setSideNotes(filteredNotes);
    
  }

  useEffect(() => {
      // update localStorage
      // this function will run any time sideNotes changes (delete, update, add new note)
      localStorage.setItem(localStorageKey, JSON.stringify(sideNotes));
  }, [sideNotes])

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
        <span className="icon" onClick={hideSide}><p id="menu-icon">&#9776;</p> </span>
        <h1>Lotion</h1>
        <h5 id="caption">Like Notion, but worse.</h5>
      </header>
      <div className="body">
        <div className="flex-container">
          <div className="side" id="side">
            <div className="side-head">
              <h2>Notes</h2>
              <h2 id="add" onClick={addClicked}>+</h2>
            </div>
            <div className="side-body">
              {sideNotes.length === 0 ? (
                <p id="no-note">No Note Yet</p>
              ) : (
                <ul className="note-tags">
                  {sideNotes.map((element, noteNum) => (
                    <li key={element.id} className="note-tag">
                      <NavLink to={`/notes/${noteNum + 1}`} /*activeclassname = "active-note"*/>
                        <h3>{element.title}</h3>
                        <small>{formatDate(element.date)}</small>
                        <p dangerouslySetInnerHTML={{ __html: `${element.note.slice(0, MAX_CHARS)}...` }} />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="main" >
            {showOutlet ? (
              <Outlet context={[sideNotes, updateNote, deleteNote]} />
            ) : (
              <p id="main-initial">Select a note, or create a new one.</p>
            )}

          </div>
        </div>
      </div>
    </>
  )

}

export default Layout;