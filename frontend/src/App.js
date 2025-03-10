import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import NavBar from "./components/NavBar.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
