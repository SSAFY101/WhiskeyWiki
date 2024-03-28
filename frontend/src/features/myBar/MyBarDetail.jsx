import React, { useState } from "react";
import Modal from "../modal/Modal";
import MyBarCheckEmpty from "./MyBarCheckEmpty";
import { Link } from "react-router-dom";

function MyBarDetail({ whiskeyId, whiskeyNameKr, whiskeyNameEn, isOwner }) {
  // 모달 제어 - 3. 빈 병 표시하기
  const [isCheckEmptyModalOpen, setIsCheckEmptyModalOpen] = useState(false);
  const handleCloseCheckEmptyModal = () => {
    setIsCheckEmptyModalOpen(false);
  };

  // 빈 병 표시하기 (모달)
  const checkWhiskeyEmpty = () => {
    setIsCheckEmptyModalOpen(true);
  };

  return (
    <>
      {/* 위스키 상세정보 내용 */}
      <p>{whiskeyId}번 위스키 상세 정보 울렐레~~</p>
      <p>내 이름은 {whiskeyNameKr}</p>
      <p>영어로는 {whiskeyNameEn}</p>

      {/* 위스키별 상세페이지로 이동 */}
      <Link to="/whiskeyDetail/{whiskeyId}">상세 정보 보기</Link>

      {/* 위스키별 빈 병 표시하기 */}
      {isOwner && ( // isOwner가 true일 때에만 버튼 렌더링
        <button onClick={checkWhiskeyEmpty}>빈 병 표시하기</button>
      )}

      {/* 조건부 렌더링 */}
      {isCheckEmptyModalOpen && (
        <Modal
          isOpen={isCheckEmptyModalOpen}
          onClose={handleCloseCheckEmptyModal}
        >
          <MyBarCheckEmpty
            whiskeyId={whiskeyId}
            whiskeyNameKr={whiskeyNameKr}
            whiskeyNameEn={whiskeyNameEn}
          />
        </Modal>
      )}
    </>
  );
}

export default MyBarDetail;
