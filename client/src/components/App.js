import SignUp from "./register"
import SignIn from "./Login"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/register" exact element={<SignUp/>}/>
          <Route path="/login" exact element={<SignIn/>}/>
        </Routes>
    </Router>

  );
}

export default App;
