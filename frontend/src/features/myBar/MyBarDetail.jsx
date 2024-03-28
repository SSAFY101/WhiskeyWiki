import React, { useState } from "react";
import Modal from "../modal/Modal";
import MyBarCheckEmpty from "./MyBarCheckEmpty";
import { Link } from "react-router-dom";

function MyBarDetail() {
  //모달 제어
  const [isCheckEmptyModalOpen, setIsCheckEmptyModalOpen] = useState(false);
  const handleCloseCheckEmptyModal = () => {
    setIsCheckEmptyModalOpen(false);
  };

  // 빈 병 표시하기 (모달)
  const checkWhiskeyEmpty = () => {
    console.log("빈 병 표시하기");
    setIsCheckEmptyModalOpen(true);
  };

  return (
    <>
      <p>{}</p>
      <p>위스키의 상세정보 내용 울렐레~~</p>
      {/* 위스키별 상세페이지로 이동 */}
      <Link to="/whiskeyDetail">상세 정보 보기</Link>
      {/* <Link to="/whiskeyDetail/{whiskeyId}">상세 정보 보기</Link> */}

      {/* 위스키별 빈 병 표시하기 */}
      <button onClick={checkWhiskeyEmpty}>빈 병 표시하기</button>

      {/* 조건부 렌더링 */}
      {isCheckEmptyModalOpen && (
        <Modal
          isOpen={isCheckEmptyModalOpen}
          onClose={handleCloseCheckEmptyModal}
        >
          <MyBarCheckEmpty />
        </Modal>
      )}
    </>
  );
}

export default MyBarDetail;
