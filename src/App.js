import logo from "./logo.svg";
import "./App.css";
import Backend from "./components/backend/Backend";
//import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/frontend/Main";
import "spectre.css";

function App() {
  return (
    <div className="App" style={{ maxWidth: "1024px", margin: "auto" }}>
      <Routes>
        <Route path="/backend" element={<Backend> </Backend>}></Route>
      </Routes>
      <Routes>
        <Route path="/frontend/*" element={<Main></Main>}></Route>
      </Routes>
    </div>
  );
}

export default App;
