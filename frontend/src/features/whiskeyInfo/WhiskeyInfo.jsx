import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setWhiskeys } from "../../store/slices/whiskeyInfo";
import { Route, useNavigate } from "react-router-dom";
import SearchBar from "../../widgets/Searchbar";
import Infocard from "./InfoCard";
import WhiskeySorter from "./WhiskeySorter";
import style from "./WhiskeyInfo.module.css";

function WhiskeyInfo() {
  const [whiskeys, setWhiskeys] = useState([]);
  const dispatch = useDispatch();
  // 정렬 순서 상태를 저장
  //기존값 한글 이름 오름차순
  const [sortOrder, setSortOrder] = useState("name-asc");
  // 사용자가 정렬을 변경할 때 실행될 함수
  const handleSortChange = (order) => {
    setSortOrder(order);
  };
  //검색으로 인해 필터링 된 위스키를 저장할 배열
  const [filteredWhiskey, setFilteredWhiskey] = useState([]);
  //사용자가 검색을 수행할 때 실행될 함수
  const handleSearch = (query) => {
    const filtered = whiskeys.filter(
      (whiskey) =>
        whiskey.whiskeyNameKr.toLowerCase().includes(query.toLowerCase()) ||
        whiskey.whiskeyNameEn.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredWhiskey(filtered);
    setDisplayedWhiskeys(filtered);
  };
  // 위스키 목록 불러오기
  const fetchWhiskeyList = async () => {
    try {
      const response = await axios.get(
        `/api/whiskey/list`
      );
      console.log("위스키 목록 조회 성공", response.data.data);
      setWhiskeys(response.data.data)
      setDisplayedWhiskeys(response.data.data)
    } catch (error) {
      console.error("에러 발생", error);
    }
  };
 
  //화면에 표시될 위스키 목록 따로 추가
  const [displayedWhiskeys, setDisplayedWhiskeys] = useState(whiskeys);

  useEffect(() => {
    //초기 로드시 모든 위스키를 보여줌
    fetchWhiskeyList();
  }, []);

  const navigate = useNavigate();
  // const goToDetail = (whiskeyId, image) => {
  //   navigate(`/whiskeyDetail/${whiskeyId}`, { state: {imageUrl: image} });
  // };
  // 정렬 함수
  const sortWhiskeys = (whiskeys) => {
    switch (sortOrder) {
      // 한글
      case "name-asc-kr":
        return [...whiskeys].sort((a, b) => a.whiskeyNameKr.localeCompare(b.whiskeyNameKr));
      case "name-desc-kr":
        return [...whiskeys].sort((a, b) => b.whiskeyNameKr.localeCompare(a.whiskeyNameKr));
      //영어
      case "name-asc-en":
        return [...whiskeys].sort((a, b) => a.whiskeyNameEn.localeCompare(b.whiskeyNameEn));
      case "name-desc-en":
        return [...whiskeys].sort((a, b) => b.whiskeyNameEn.localeCompare(a.whiskeyNameEn));
      //도수
      case "abv-asc":
        return [...whiskeys].sort(
          (a, b) => parseFloat(a.abv) - parseFloat(b.abv)
        );
      case "abv-desc":
        return [...whiskeys].sort(
          (a, b) => parseFloat(b.abv) - parseFloat(a.abv)
        );
      //가격
      case "price-asc":
        return [...whiskeys].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "price-desc":
        return [...whiskeys].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      default:
        return whiskeys;
    }
  };
  React.useEffect(() => {
    const sorted = sortWhiskeys(
      filteredWhiskey.length > 0 ? filteredWhiskey : whiskeys
    );
    setDisplayedWhiskeys(sorted);
  }, [sortOrder, filteredWhiskey]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className={style.container}>
        <WhiskeySorter onSortChange={handleSortChange} />
        <div className={style.cardContainer}>
          {displayedWhiskeys.map((item) => (
            <Infocard
              key={item.whiskeyNameEn}
              whiskeyId={item.whiskeyId}
              nameKr={item.whiskeyNameKr}
              nameEn={item.whiskeyNameEn}
              taste={item.whiskeyFlavor}
              abv={item.abv}
              price={item.price}
              rating={item.starRating}
            
            />
          ))}
        </div>
        {/* <div className={style.cardContainer}>
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
        </div> */}
      </div>
    </div>
  );
}
export default WhiskeyInfo;
