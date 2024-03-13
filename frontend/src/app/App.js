import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../widgets/Navbar';
import Login from '../features/auth/login/Login';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
      test
    </div>
    </Router>
      );
}

export default App;
