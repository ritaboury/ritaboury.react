import React, {useState} from "react";
import {NavLink, Outlet} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Layout({sideNotes, setSideNotes, noteNum, setNoteNum }) {
    const [showOutlet, setShowOutlet] = useState(false);

    const addClicked = () => {
      const newNoteNum = noteNum + 1;
      const newNote = {
        id: uuidv4(),
        title: 'Untitled',
        date: '',
        note: '...',
      };
      setSideNotes([newNote, ...sideNotes]);
      setNoteNum(newNoteNum);
      setShowOutlet(true);
      localStorage.setItem(newNoteNum, JSON.stringify(newNote));
    };

    const hideSide = ()=> {
        const side = document.getElementById("side");
        side.classList.toggle("hidden");
    }

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
              {sideNotes.length === 0 ? (
                <p id = "no-note">No Note Yet</p>
              ) : (
                <ul class = "note-tags">
                  {sideNotes.map((element, idx) => (
                    <li class = "note-tag">
                      <NavLink to = {`/notes/${idx}`}>
                        <h3>{element.title}</h3>
                        <small>{element.date}</small>
                        <p dangerouslySetInnerHTML={{__html: element.note}} />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div class= "main">
            {showOutlet ? (
              <Outlet>
              </Outlet>
            ) : (
              <p id="main-initial">Select a note, or create a new one.</p>
            )}
          </div>
        </div>
      </body>
      </>
    )

}

export default Layout;