import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setWhiskeys } from "../../store/slices/whiskeyInfo";
import { Route, useNavigate } from "react-router-dom";
import SearchBar from "../../widgets/Searchbar";
import Infocard from "./InfoCard";
import WhiskeySorter from "./WhiskeySorter";
import style from "./WhiskeyInfo.module.css";

function WhiskeyInfo() {
  const dispatch = useDispatch();
  //검색으로 인해 필터링 된 위스키를 저장할 배열
  const [filteredWhiskey, setFilteredWhiskey] = useState([]);
  //사용자가 검색을 수행할 때 실행될 함수
  const handleSearch = (query) => {
    const filtered = whiskeys.filter(
      (whiskey) =>
        whiskey.nameKr.toLowerCase().includes(query.toLowerCase()) ||
        whiskey.nameEn.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredWhiskey(filtered);
  };
  const whiskeys = [
    {
      nameKr: "앱솔루트",
      nameEn: "Absolut",
      taste: "위스키 맛",
      abv: "40도",
      price: 10000,
      rating: 5,
    },
    {
      nameKr: "짐빔",
      nameEn: "Absolut2",
      taste: "위스키 맛2",
      abv: "402도",
      price: 100002,
      rating: 2,
    },
  ];

  React.useEffect(() => {
    //초기 로드시 모든 위스키를 보여줌
    dispatch(setWhiskeys(whiskeys));
  }, [dispatch]);

  const navigate = useNavigate();
  const goToDetail = () => {
    navigate("/whiskeyDetail");
  };
  return (
    <div>
      <h1>위스키 목록</h1>
      <SearchBar onSearch={handleSearch} />
      <div className={style.container}>
        <WhiskeySorter />
        <div className={style.cardContainer}>
          {filteredWhiskey.length > 0
            ? filteredWhiskey.map((item) => (
                <Infocard
                  key={item.nameEn}
                  nameKr={item.nameKr}
                  nameEn={item.nameEn}
                  taste={item.taste}
                  abv={item.abv}
                  price={item.price}
                  rating={item.rating}
                  onClick={goToDetail}
                />
              ))
            : whiskeys.map((item) => (
                <Infocard
                  key={item.nameEn}
                  nameKr={item.nameKr}
                  nameEn={item.nameEn}
                  taste={item.taste}
                  abv={item.abv}
                  price={item.price}
                  rating={item.rating}
                  onClick={goToDetail}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
export default WhiskeyInfo;
