import React, { useState } from "react";
import Modal from "../modal/Modal";
import MyBarDetail from "./MyBarDetail";
import MyBarBook from "./MyBarBook";
import style from "./MyBar.module.css";
import { ShelfImage, BookImage, WhiskeyImages } from "./MyBarImages";

function MyBar() {
  // 모달 제어 - 1. 위스키 상세 모달
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const handleDetailCloseModal = () => {
    setIsDetailModalOpen(false);
  };

  // 모달 제어 - 2. 칵테일 레시피 즐겨찾기(Book) 모달
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const handleBookCloseModal = () => {
    setIsBookModalOpen(false);
  };

  // 개별 위스키 클릭 함수
  const [selectedWhiskey, setSelectedWhiskey] = useState(null);
  const handleWhiskeyClick = (whiskey) => {
    setSelectedWhiskey(whiskey);
    setIsDetailModalOpen(true);
  };

  // 뒤로가기 버튼
  const handleGoBack = () => {
    window.history.back();
  };

  // 위스키 이미지 클릭 이벤트 핸들러 함수들
  // const clickWhiskeys = [
  //   () => console.log("Whiskey 클릭 이벤트 발생 1"),
  //   () => console.log("Whiskey 클릭 이벤트 발생 2"),
  //   () => console.log("Whiskey 클릭 이벤트 발생 3"),
  //   () => console.log("Whiskey 클릭 이벤트 발생 4"),
  //   () => console.log("Whiskey 클릭 이벤트 발생 5"),
  //   () => console.log("Whiskey 클릭 이벤트 발생 6"),
  //   () => console.log("Whiskey 클릭 이벤트 발생 7"),
  //   () => console.log("Whiskey 클릭 이벤트 발생 8"),
  //   () => console.log("Whiskey 클릭 이벤트 발생 9"),
  //   () => console.log("Whiskey 클릭 이벤트 발생 10"),
  // ];

  return (
    <div className={style.background}>
      {/* 뒤로가기 버튼 */}
      {/* 로그인한 유저 === Mybar페이지의 주인 => 뒤로가기 버튼 등장 */}
      <button className={`${style.backButton}`} onClick={handleGoBack}>
        &lt; 뒤로가기
      </button>

      {/* 위스키 선반 */}
      {/* => 길이가 3인 배열을 생성하고, map 함수를 사용하여 각 요소에 대해 이미지를 렌더링 (간결 코드 작성) */}
      <div>
        {[...Array(3)].map((_, index) => (
          <img
            key={index}
            src={ShelfImage.imgUrl}
            alt=""
            className={`${style.shelf} ${style[`shelf${index + 1}`]}`}
          />
        ))}
      </div>

      {/* 칵테일 레시피 즐겨찾기(book) */}
      <img
        src={BookImage.imgUrl}
        alt=""
        className={`${style.book}`}
        onClick={() => setIsBookModalOpen(true)}
      />

      {/* 개별 위스키 */}
      <div className={style.container}>
        {/* 위스키 이미지 */}
        {WhiskeyImages.map((whiskey, index) => (
          <img
            // key={index}
            key={whiskey.whiskeyId}
            src={whiskey.imgUrl}
            alt=""
            className={`${style.whiskey} ${
              style[`whiskey${Math.floor(index / 10) + 1}`]
            } ${style[`position${(index % 10) + 1}`]}`}
            // onClick={clickWhiskeys[index]}
            onClick={() => handleWhiskeyClick(whiskey)}
          />
        ))}
        {/* 모달 조건부 렌더링 - 1. 위스키 상세 모달 */}
        {isDetailModalOpen && (
          <Modal isOpen={isDetailModalOpen} onClose={handleDetailCloseModal}>
            {/* 선택된 위스키 아이디를 모달에 전달 */}
            {selectedWhiskey && (
              <MyBarDetail whiskeyId={selectedWhiskey.whiskeyId} />
            )}
          </Modal>
        )}
        {/* 모달 조건부 렌더링 - 2. 칵테일 레시피 즐겨찾기(Book) 모달 */}
        {isBookModalOpen && (
          <Modal isOpen={isBookModalOpen} onClose={handleBookCloseModal}>
            <MyBarBook />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default MyBar;
