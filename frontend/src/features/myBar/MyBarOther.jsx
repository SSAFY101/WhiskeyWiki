import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import MyBarDetail from "./MyBarDetail";
import style from "./MyBar.module.css";
import { ShelfImage, BookImage, WhiskeyImages } from "./MyBarImages";

function MyBarOther() {
  const [whiskeyStatusList, setWhiskeyStatusList] = useState([]); // API Response 담을 변수 (빈 배열)

  useEffect(() => {
    // GET 요청: 다른 유저의 My Bar 조회 (다른 유저의 위스키 보유 상태 리스트 조회)
    // axios({
    //   method: "get",
    //   url: "api/mybar/{userId}",
    // })
    //   .then((res) => {
    //     console.log("다른 유저의 My Bar 인식 위스키 정보 : ", res.data);
    //     const data = res.data.data;
    //     setWhiskeyStatusList(data);
    //   })
    //   .catch((err) => {
    //     console.log("다른 유저의 My Bar 리스트 정보 ERROR :", err);
    //   });

    // API test 코드
    setWhiskeyStatusList([
      // {
      // // case 1. 위스키 없음
      //   whiskeyId: 1,
      //   isEmpty: false,
      // },
      {
        // case 2. 위스키 보유
        whiskeyId: 2,
        isEmpty: false,
      },
      {
        // case 3. 위스키 빈병
        whiskeyId: 3,
        isEmpty: true,
      },
    ]);
  }, []);
  // console.log(whiskeyStatusList);

  // 모달 제어 - 위스키 상세 모달
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const handleDetailCloseModal = () => {
    setIsDetailModalOpen(false);
  };

  // 개별 위스키 이미지 클릭 이벤트 핸들러 함수
  const [selectedWhiskey, setSelectedWhiskey] = useState(null);
  const handleWhiskeyClick = (whiskey) => {
    setSelectedWhiskey(whiskey);
    setIsDetailModalOpen(true);
  };

  // 위스키 상태 표시 함수
  const whiskeyStatus = (whiskeyId) => {
    // whiskeyId와 whiskeyStatusList 안의 whiskeyId를 비교하여 상태를 결정합니다.
    const whiskey = whiskeyStatusList.find(
      (item) => item.whiskeyId === whiskeyId
    );
    if (whiskey) {
      // whiskey가 존재하는 경우
      if (!whiskey.isEmpty) {
        // whiskey가 비어있지 않은 경우
        return style.whiskeyEmpty;
      } else {
        // whiskey가 비어있는 경우
        return style.whiskeyFull;
      }
    } else {
      // whiskey가 존재하지 않는 경우
      return style.whiskeyNone;
    }
  };

  // 나가기 버튼
  const handleClose = () => {
    window.close();
  };

  // 거래 요청 버튼
  const startChat = () => {
    console.log("startChat");
  };

  return (
    <div className={style.background}>
      {/* 뒤로가기 버튼 */}
      {/* 로그인한 유저 === Mybar페이지의 주인 => 뒤로가기 버튼 등장 */}
      <button className={`${style.closeButton}`} onClick={handleClose}>
        &lt; 나가기
      </button>

      {/* 위스키 선반 */}
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
        className={`${style.bookDecoration}`}
      />

      {/* 개별 위스키 */}
      <div className={style.container}>
        {/* 위스키 이미지 */}
        {WhiskeyImages.map((whiskey, index) => (
          <img
            key={whiskey.whiskeyId}
            src={whiskey.imgUrl}
            alt=""
            className={`${style.whiskey} ${whiskeyStatus(whiskey.whiskeyId)}
             ${style[`whiskey${Math.floor(index / 10) + 1}`]} ${
              style[`position${(index % 10) + 1}`]
            }`}
            onClick={() => handleWhiskeyClick(whiskey)}
          />
        ))}

        {/* 모달 조건부 렌더링 - 1. 위스키 상세 모달 */}
        {isDetailModalOpen && (
          <Modal isOpen={isDetailModalOpen} onClose={handleDetailCloseModal}>
            {/* 선택된 위스키 아이디를 모달에 전달 */}
            {selectedWhiskey && (
              <MyBarDetail
                whiskeyId={selectedWhiskey.whiskeyId}
                whiskeyNameKr={selectedWhiskey.whiskeyNameKr}
                whiskeyNameEn={selectedWhiskey.whiskeyNameEn}
                isOwner={false}
              />
            )}
          </Modal>
        )}
      </div>

      {/* 거래 요청 버튼 */}
      <button className={style.startChat} onClick={startChat}>
        거래 요청
      </button>
    </div>
  );
}

export default MyBarOther;
