import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import style from "./WhiskeyDetail.module.css";
import IconContainer from "./components/IconContainer";
import Statistics from "./components/Statistics";
import ReviewList from "./components/ReviewList";
import CocktailRecipe from "./components/CocktailRecipe";

function WhiskeyDetail() {
  const params = useParams();
  const location = useLocation();
  const whiskeyId = params.whiskeyId;
  const imageUrl = location.state?.imageUrl;
  const [whiskeyDetail, setWhiskeyDetail] = useState(null);

  useEffect(() => {
    const fetchWhiskeyDetail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/whiskey/info/${whiskeyId}`
        );
        console.log(response.data.data);
        setWhiskeyDetail(response.data.data);
      } catch (error) {
        console.error("위스키 상세 정보 가져오기 실패", error);
      }
    };
    fetchWhiskeyDetail();
  }, [whiskeyId]);

  return (
    <div>
      {whiskeyDetail ? (
        <div className={style.outerContainer}>
          <div className={style.innerContainer}>
            <div className={style.infoArea}>
              <img src={imageUrl} alt="" />
              <div className={style.textArea}>
                {/* <p style={{ fontSize: '40px' }}>Absolut</p> */}
                <h1>{whiskeyDetail.whiskeyNameEn}</h1>
                <h2>{whiskeyDetail.whiskeyNameKr}</h2>
                <IconContainer
                  abv={whiskeyDetail.abv}
                  price={whiskeyDetail.price}
                  flavor={whiskeyDetail.whiskeyFlavor}
                />

                <p>{whiskeyDetail.detail}</p>
                <div className={style.statisticsContainer}></div>
              </div>
            </div>
            <Statistics />
            <p className={style.titleWithLines}>recipe</p>
            <CocktailRecipe />
            <p className={style.titleWithLines}>review</p>
            <ReviewList />
          </div>
        </div>
      ) : (
        <div>Loding...</div>
      )}
    </div>
  );
}
export default WhiskeyDetail;
