import React, { useState, useEffect } from "react";
import style from "./MyBarBook.module.css";
import instance from "../auth/axiosInterceptor";

function MyBarBook() {
  const [myFavorite, setMyFavorite] = useState([]);
  //페이지 넘기기
  const [currentIndex, setCurrentIndex] = useState(0);
  const fetchFavorite = async () => {
    try {
      const response = await instance.get(`api/mybar/favorite/list`);
      console.log("즐겨찾기한 칵테일", response.data.data);
      setMyFavorite(response.data.data);
    } catch (error) {
      console.log("위스키 목록 가져오기 에러 발생", error);
    }
  };
  // 초기 로드시 즐겨찾기 한 위스키 보여주기
  useEffect(() => {
    fetchFavorite();
  }, []);
  // 다음 레시피 보기
  const handleNext = () => {
    setCurrentIndex((prevIndev) => (prevIndev + 1) % myFavorite.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndev) => (prevIndev - 1 + myFavorite.length) % myFavorite.length
    );
  };

  return (
    <div className={style.container}>
      <div className={style.background}>
        <div className={style.recipe}>
          {myFavorite.length > 0 ? (
            <div className={style.recipe}>
              <p>{myFavorite[currentIndex].cocktailName}</p>
              <p>{myFavorite[currentIndex].detail}</p>
              <p>{myFavorite[currentIndex].recipe}</p>
              <button onClick={handlePrevious}>이전</button>
              <button onClick={handleNext}>다음</button>
            </div>
          ) : (
            <h1>즐겨찾기한 칵테일이 없습니다.</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBarBook;
