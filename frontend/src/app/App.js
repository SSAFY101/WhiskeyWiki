import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "../widgets/Navbar";
import Login from "../features/auth/login/Login";
import MyInfo from "../features/auth/myInfo/MyInfo";
import ExchangeList from "../features/chat/ExchangeList";
import Modal from "../features/modal/Modal";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  //모달 닫는 함수
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <Router>
      <div>
        <Navbar onLoginClick={() => setIsLoginModalOpen(true)}></Navbar>
        <Routes></Routes>
        {/* 조건부 렌더링 */}
        {isLoginModalOpen && (
          <Modal isOpen={isLoginModalOpen} onClose={handleCloseModal}>
            <Login />
          </Modal>
        )}
      </div>
    </Router>
  );
}

export default App;
