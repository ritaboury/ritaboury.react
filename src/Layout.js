import React, {useState} from "react";
import {NavLink, Outlet} from "react-router-dom";

function Layout() {
    const [sideNotes, setSideNotes] = useState([]);

    const addClicked = () => {
        setSideNotes([{
            title: `Untitled ${sideNotes.length}`,
            date: "--",
            note: "Body"
        },
        ...sideNotes,
    ]);
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
              <p id = "no-note">No Note Yet</p>
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