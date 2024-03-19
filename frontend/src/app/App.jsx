import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// 홈
import Home from "../features/home/index";
import Navbar from "../widgets/Navbar";
// 유저 관리
import Login from "../features/auth/login/Login";
import Modal from "../features/modal/Modal";
import MyBar from "../features/myBar/MyBar";
import ExchangeMap from "../features/exchangeMap/ExchangeMap";
import Signup from "../features/auth/signup/Signup";
// 위스키 등록
import WhiskeyRegister from "../features/whiskeyRegister/index";
// 채팅
import ChatList from "../features/chat/ChatList";
import Chat from "../features/chat/Chat";
//위스키 정보
import WhiskeyInfo from '../features/whiskeyInfo/WhiskeyInfo'
import WhiskeyDetail from "../features/whiskeyInfo/WhiskeyDetail";

import style from "./App.module.css";

const App = () => {
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
          className={`${style.navbar}`}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onSignupClick={() => setIsSignupModalOpen(true)}
        />
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<Home />} />
          {/* 위스키 정보 */}
          {/* 위스키 등록 */}
          <Route path="/register" element={<WhiskeyRegister />} />
          {/* 지도 */}
          <Route path="/exchangeMap" element={<ExchangeMap />} />
          {/* 채팅 */}
          <Route path="/chat" element={<ChatList />} />
          <Route path="/chat/:id" element={<Chat />} />
          {/* 마이바 */}
          <Route path="/myBar" element={<MyBar />} />
          {/* 위스키 정보 */}
          <Route path="/whiskeyInfo" element={<WhiskeyInfo />}></Route>
          {/* 위스키 디테일 */}
          <Route path="/WhiskeyDetail" element={ <WhiskeyDetail/>}></Route>
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
};

export default App;
