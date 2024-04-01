import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { resetReviewSubmission } from "../../store/slices/review";
import axios from "axios";
import style from "./WhiskeyDetail.module.css";
import IconContainer from "./components/IconContainer";
import Statistics from "./components/Statistics";
import ReviewList from "./components/ReviewList";
import CocktailRecipe from "./components/CocktailRecipe";

function WhiskeyDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const whiskeyId = params.whiskeyId;
  const imageUrl = location.state?.imageUrl;
  const reviewSubmitted = useSelector((state) => state.review.reviewSubmitted);
  //기본정보
  const [whiskeyDetail, setWhiskeyDetail] = useState(null);
  //통계정보
  const [whiskeyStatistic, setWhiskeyStatistic] = useState(null);
  //리뷰
  const [whiskeyReview, setWhiskeyReview] = useState(null);

  useEffect(() => {
    // 위스키 기본 정보 가져오기
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
    // 위스키 선호도 통계 가져오기
    const fetchWhiskeyStatistic = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/whiskey/statistic/${whiskeyId}`
        );
        console.log("위스키 선호도 통계 가져오기 성공", response.data);
      } catch (error) {
        console.log("위스키 선호도 통계 가져오기 실패", error);
      }
    };
    //위스키 리뷰 가져오기
    const fetchWhiskeyReview = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/whiskey/review/${whiskeyId}`
        );
        console.log(
          "위스키 리뷰 가져오기 성공",
          response.data.data.reviewDataList
        );
        setWhiskeyReview(response.data.data.reviewDataList);
        dispatch(resetReviewSubmission()); //상태 초기화
      } catch (error) {
        console.log("위스키 선호도 통계 가져오기 실패", error);
      }
    };
    //리뷰가 제출되었다면 새로고침
    if (reviewSubmitted) {
      fetchWhiskeyReview();
    }

    fetchWhiskeyDetail();
    fetchWhiskeyStatistic();
    fetchWhiskeyReview();
  }, [whiskeyId, reviewSubmitted, dispatch]);

  return (
    <div>
      {whiskeyDetail ? (
        <div className={style.outerContainer}>
          <div className={style.innerContainer}>
            <div className={style.infoArea}>
              <img className={style.whiskeyImage} src={imageUrl} alt="" />
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
              </div>
            </div>
            <Statistics />
            <p className={style.titleWithLines}>recipe</p>
            <CocktailRecipe />
            <p className={style.titleWithLines}>review</p>
            <ReviewList reviewList={whiskeyReview} whiskeyId={whiskeyId} />
          </div>
        </div>
      ) : (
        <div>Loding...</div>
      )}
    </div>
  );
}
export default WhiskeyDetail;
