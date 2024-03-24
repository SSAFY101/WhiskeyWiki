import React, { useState } from "react";
import Modal from "../modal/Modal";
import MyBarDetail from "./MyBarDetail";
import MyBarBook from "./MyBarBook";
import style from "./MyBar.module.css";

// 위스키 선반 이미지 불러오기
import ShelfImage from "../../assets/images/whiskey/MyBar_WhiskeyBar.png";

// 레시피 즐겨찾기 이미지 불러오기
import BookImage from "../../assets/images/whiskey/MyBar_Book.jpg";

// 위스키 이미지 불러오기
import Whiskey1 from "../../assets/images/whiskey/Absolut.png";
import Whiskey2 from "../../assets/images/whiskey/Ballantines.png";
import Whiskey3 from "../../assets/images/whiskey/JackDaniels.png";
import Whiskey4 from "../../assets/images/whiskey/Jagermeister.png";
import Whiskey5 from "../../assets/images/whiskey/JimBeam.png";
import Whiskey6 from "../../assets/images/whiskey/JohnnieWalker.png";
import Whiskey7 from "../../assets/images/whiskey/Absolut.png";
import Whiskey8 from "../../assets/images/whiskey/Ballantines.png";
import Whiskey9 from "../../assets/images/whiskey/JackDaniels.png";
import Whiskey10 from "../../assets/images/whiskey/Jagermeister.png";

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

  // 뒤로가기 버튼
  const handleGoBack = () => {
    window.history.back();
  };

  // 위스키 이미지
  const WhiskeyImages1 = [
    Whiskey1,
    Whiskey2,
    Whiskey3,
    Whiskey4,
    Whiskey5,
    Whiskey6,
    Whiskey7,
    Whiskey8,
    Whiskey9,
    Whiskey10,
  ];
  const WhiskeyImages2 = [
    Whiskey1,
    Whiskey2,
    Whiskey3,
    Whiskey4,
    Whiskey5,
    Whiskey6,
    Whiskey7,
    Whiskey8,
    Whiskey9,
    Whiskey10,
  ];
  const WhiskeyImages3 = [
    Whiskey6,
    Whiskey1,
    Whiskey2,
    Whiskey3,
    Whiskey4,
    Whiskey5,
    Whiskey7,
    Whiskey8,
    Whiskey9,
    Whiskey10,
  ];

  // 위스키 이미지 클릭 이벤트 핸들러 함수들
  const clickWhiskeys = [
    () => console.log("Whiskey 클릭 이벤트 발생 1"),
    () => console.log("Whiskey 클릭 이벤트 발생 2"),
    () => console.log("Whiskey 클릭 이벤트 발생 3"),
    () => console.log("Whiskey 클릭 이벤트 발생 4"),
    () => console.log("Whiskey 클릭 이벤트 발생 5"),
    () => console.log("Whiskey 클릭 이벤트 발생 6"),
    () => console.log("Whiskey 클릭 이벤트 발생 7"),
    () => console.log("Whiskey 클릭 이벤트 발생 8"),
    () => console.log("Whiskey 클릭 이벤트 발생 9"),
    () => console.log("Whiskey 클릭 이벤트 발생 10"),
  ];

  return (
    <div className={style.background}>
      {/* 뒤로가기 버튼 */}
      <button className={`${style.backButton}`} onClick={handleGoBack}>
        &lt; 뒤로가기
      </button>

      {/* 위스키 선반 */}
      <div>
        <img
          src={ShelfImage}
          alt=""
          className={`${style.shelf} ${style.shelf1}`}
        />
        <img
          src={ShelfImage}
          alt=""
          className={`${style.shelf} ${style.shelf2}`}
        />
        <img
          src={ShelfImage}
          alt=""
          className={`${style.shelf} ${style.shelf3}`}
        />
      </div>

      {/* 칵테일 레시피 즐겨찾기(book) */}
      <img
        src={BookImage}
        alt=""
        className={`${style.book}`}
        onClick={() => setIsBookModalOpen(true)}
      />

      {/* 개별 위스키 */}
      <div className={style.container}>
        {/* 위스키 1세트 - whiskey1 */}
        {WhiskeyImages1.map((path, index) => (
          <img
            key={index}
            src={path}
            alt=""
            className={`${style.whiskey} ${style.whiskey1} ${
              style[`position${index + 1}`]
            }`}
            // onClick={clickWhiskeys[index]}
            onClick={() => setIsDetailModalOpen(true)}
          />
        ))}
        {/* 위스키 2세트 - whiskey2 */}
        {WhiskeyImages2.map((path, index) => (
          <img
            key={index}
            src={path}
            alt=""
            className={`${style.whiskey} ${style.whiskey2} ${
              style[`position${index + 1}`]
            }`}
            onClick={() => setIsDetailModalOpen(true)}
          />
        ))}
        {/* 위스키 3세트 - whiskey3 */}
        {WhiskeyImages3.map((path, index) => (
          <img
            key={index}
            src={path}
            alt=""
            className={`${style.whiskey} ${style.whiskey3} ${
              style[`position${index + 1}`]
            }`}
            onClick={() => setIsDetailModalOpen(true)}
          />
        ))}
        {/* 조건부 렌더링 */}
        {isDetailModalOpen && (
          <Modal isOpen={isDetailModalOpen} onClose={handleDetailCloseModal}>
            <MyBarDetail />
          </Modal>
        )}
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
