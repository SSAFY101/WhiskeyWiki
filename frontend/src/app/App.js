import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "../widgets/Navbar";
import Login from "../features/auth/login/Login";
import Modal from "../features/modal/Modal";
import MyBar from "../features/myBar/myBar";
import ExchangeMap from "../features/exchangeMap/exchangeMap";
import Signup from "../features/auth/signup/Signup";
import WhiskeyRegister from "../features/whiskeyRegister/index";


function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  //모달 닫는 함수
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };
  return (
    <Router>
      <div>
        <Navbar
          onLoginClick={() => setIsLoginModalOpen(true)}
          onSignupClick={() => setIsSignupModalOpen(true)}
        ></Navbar>
        <Routes>
          <Route path="/myBar" element={<MyBar />}></Route>
          <Route path="/exchangeMap" element={<ExchangeMap />}></Route>
          <Route path="/register" element={<WhiskeyRegister />} />
        </Routes>
        {/* 조건부 렌더링 */}
        {isLoginModalOpen && (
          <Modal isOpen={isLoginModalOpen} onClose={handleCloseModal}>
            <Login />
          </Modal>
        )}
        {isSignupModalOpen && (
          <Modal isOpen={isSignupModalOpen} onClose={handleCloseModal}>
            <Signup />
          </Modal>
        )}
      </div>
    </Router>
  );
}

export default App;
