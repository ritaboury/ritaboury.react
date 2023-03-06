import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteEdit from "./NoteEdit";
import NoteSave from "./NoteSave"
import FirstEdit from "./FirstEdit";
import FirstNote from "./FirstNote";
import Layout from "./Layout";

function App() {
  const [sideNotes, setSideNotes] = useState([]);
  const [noteNum, setNoteNum] = useState(0);

  return(
    <BrowserRouter>
      <Routes>
        <Route element = {<Layout sideNotes={sideNotes} setSideNotes={setSideNotes} noteNum={noteNum} setNoteNum={setNoteNum}/>}>
          <Route path={`/notes`} element={<NoteEdit sideNotes={sideNotes} setSideNotes={setSideNotes} noteNum={noteNum} setNoteNum={setNoteNum} />}></Route>
          <Route path={`/notes/${noteNum}`} element={<NoteSave sideNotes={sideNotes} setSideNotes={setSideNotes} noteNum={noteNum} setNoteNum={setNoteNum}/>}></Route>
          <Route path={`/notes/${noteNum}/edit`} element={<NoteEdit sideNotes={sideNotes} setSideNotes={setSideNotes} noteNum={noteNum} setNoteNum={setNoteNum}/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
