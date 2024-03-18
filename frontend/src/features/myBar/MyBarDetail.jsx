import React, { useState } from "react";
import Modal from "../modal/Modal";
import MyBarCheckEmpty from "./MyBarCheckEmpty";

function MyBarDetail() {
  //모달 제어
  const [isCheckEmptyModalOpen, setIsCheckEmptyModalOpen] = useState(false);
  const handleCloseCheckEmptyModal = () => {
    setIsCheckEmptyModalOpen(false);
  };

  // 위스키별 상세페이지로 이동
  const goToWhiskeyDetail = () => {
    // 상세 페이지로 이동하는 코드 작성하기
    console.log("상세 페이지로 이동하기");
  };

  // 빈 병 표시하기
  const checkWhiskeyEmpty = () => {
    console.log("빈 병 표시하기");
    setIsCheckEmptyModalOpen(true);
  };

  return (
    <>
      <p>위스키의 상세정보 내용 울렐레~~</p>
      <button onClick={goToWhiskeyDetail}>상세 정보 보기</button>
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
