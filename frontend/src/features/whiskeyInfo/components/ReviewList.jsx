import { useState } from "react";
import style from "./ReviewList.module.css";
import Modal from "../../modal/Modal";
import CreateReview from "./CreateReview";
// 회색 SVG
import Twenties from "../../../assets/icon/Twenties.svg";
import Thirties from "../../../assets/icon/Thirties.svg";
import Forties from "../../../assets/icon/Forties.svg";
import Fifties from "../../../assets/icon/Fifties.svg";
import Female from "../../../assets/icon/Female.svg";
import Male from "../../../assets/icon/Male.svg";

function ReviewList({ reviewList , whiskeyId }) {
  //리뷰 모달 제어
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsReviewModalOpen(false);
  };
  const userData = [
    {
      nickName: "고독한 미식가",
      age: 25,
      gender: "male",
      star_rating: 2,
      content: "아주 맛있어요 냠냠 딜리셔스",
    },
    {
      nickName: "고독한 미식가",
      age: 25,
      gender: "male",
      star_rating: 4,
      content: "아주 맛있어요 냠냠 딜리셔스",
    },
  ];
  // 연령대에 따른 SVG 아이콘을 반환하는 함수
  const getAgeIcon = (age) => {
    if (age >= 20 && age < 30) {
      return <img src={Twenties} className={style.ageIcon} />;
    } else if (age >= 30 && age < 40) {
      return <img src={Thirties} className={style.ageIcon} />;
    } else if (age >= 40 && age < 50) {
      return <img src={Forties} className={style.ageIcon} />;
    } else if (age >= 50 && age < 60) {
      return <img src={Fifties} className={style.ageIcon} />;
    } else {
      return null;
    }
  };
  //성별에 따른 svg 아이콘을 반환하는 함수
  const getGenderIcon = (gender) => {
    if (gender === "여성") {
      return <img src={Female} className={style.ageIcon} />;
    } else {
      return <img src={Male} className={style.ageIcon} />;
    }
  };
  // 별점에 따른 별을 생성하는 함수
  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = "";
    //색칠된 별 추가
    for (let i = 0; i < rating; i++) {
      stars += "★";
    }
    //색칠되지 않은 별 추가
    for (let i = rating; i < totalStars; i++) {
      stars += "☆";
    }
    return stars;
  };
  return (
    <div className={style.ReviewContainer}>
      {reviewList && reviewList.length > 0 ? (
        reviewList.map((item, index) => (
          <div key={index} className={style.ReviewBox}>
            <div className={style.PersonalInfo}>
              <p>{item.nickname}</p>{" "}
              {/* 닉네임 속성 이름이 달라졌다면 여기도 수정하세요. */}
              <p>{getAgeIcon(item.age)}</p>
              <p>{getGenderIcon(item.gender)}</p>
            </div>
            <div className={style.rating}>{renderStars(item.starRating)}</div>
            <p>{item.content}</p>
          </div>
        ))
      ) : (
        <p>리뷰가 없습니다.</p> // 리뷰 데이터가 없을 때 표시될 메시지
      )}
      {/* {reviewList.map((item, index) => (
        <div key={index} className={style.ReviewBox}>
          <div className={style.PersonalInfo}>
            <p>{item.nickname}</p>
            <p>{getAgeIcon(item.age)}</p>
            <p>{getGenderIcon(item.gender)}</p>
          </div>
          <div className={style.rating}>
            {renderStars(item.starRating)}
          </div>
          <p>{item.content}</p>
        </div>
      ))} */}
      <button
        className={style.CreateReviewButton}
        onClick={() => setIsReviewModalOpen(true)}
      >
        리뷰 작성
      </button>
      {/* 조건부 렌더링 */}
      {isReviewModalOpen && (
        <Modal isOpen={isReviewModalOpen} onClose={handleCloseModal}>
          <CreateReview whiskeyId={whiskeyId} />
        </Modal>
      )}
    </div>
  );
}
export default ReviewList;
