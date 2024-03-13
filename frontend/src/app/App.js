import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../widgets/Navbar";
import Login from "../features/auth/login/Login";
import WhiskeyRegister from "../features/whiskeyRegister/index";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<WhiskeyRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
