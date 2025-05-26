import {BrowserRouter, Routes, Route} from "react-router-dom"
import { LandingPage } from "./screen/landingPage";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {LandingPage}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
