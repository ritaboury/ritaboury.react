import React, {useState} from "react";
import {NavLink, Outlet} from "react-router-dom";

function Layout() {
    const [sideNotes, setSideNotes] = useState([]);

    const addClicked = () => {
        setSideNotes([{
            title: `Untitled`,
            date: ` `,
            note: "..."
        },
        ...sideNotes,
    ]);
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
            <p id = "main-initial">Select a note, or create a new one.</p>
          </div>
        </div>
      </body>
      </>
    )

}

export default Layout;