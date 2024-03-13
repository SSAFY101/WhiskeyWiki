import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../widgets/Navbar';
import Login from '../features/auth/login/Login';
import MyBar from '../features/myBar/myBar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/myBar" element={<MyBar/>}></Route>
          </Routes>
      test
    </div>
    </Router>
      );
}

export default App;
