import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./Notes";
import FirstEdit from "./FirstEdit";
import FirstNote from "./FirstNote";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/notes" element={<Notes />}></Route>
        <Route path="/notes/1/edit" element={<FirstEdit />}></Route>
        <Route path="/notes/1" element={<FirstNote />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
