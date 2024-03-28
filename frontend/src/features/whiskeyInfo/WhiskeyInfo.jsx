import { Route, useNavigate } from "react-router-dom";
import SearchBar from "../../widgets/Searchbar";
import Infocard from "./InfoCard";
import WhiskeySorter from "./WhiskeySorter";
import style from "./WhiskeyInfo.module.css";

function WhiskeyInfo() {
  const whiskeys = [
    {
      nameKr: "앱솔루트",
      nameEn: "Absolut",
      taste: "위스키 맛",
      abv: "40도",
      price: 10000,
      rating: 5,
      // rating 왜 안주지
    },
    {
      nameKr: "앱솔루트2",
      nameEn: "Absolut2",
      taste: "위스키 맛2",
      abv: "402도",
      price: 100002,
      rating: 3,
      // rating 왜 안주지
    },
  ];
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate("/whiskeyDetail");
  };
  return (
    <div>
      <h1>위스키 목록</h1>
      <SearchBar />
      <div>
        <WhiskeySorter />
        <div className={style.cardContainer}>
          {whiskeys.map((item) => (
            console.log("하이",item.nameEn),
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
