import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./Notes";
import FirstEdit from "./FirstEdit";
import FirstNote from "./FirstNote";
import Layout from "./Layout";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element = {<Layout />}>
          <Route path="/notes" element={<Notes />}></Route>
          <Route path="/notes/:noteId" element={<FirstNote />}></Route>
          <Route path="/notes/:noteId/edit" element={<FirstEdit />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
