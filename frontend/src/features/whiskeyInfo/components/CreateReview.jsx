import style from "./CreateReview.module.css";
import { useState } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { submitReview } from "../../../store/slices/review";
//로그인 상태일 때
import instance from "../../auth/axiosInterceptor";
const CreateReview = ({ whiskeyId, closeModal, totalStars = 5 }) => {
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const handleSetRating = (index) => {
    setRating(index);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  //리뷰 post 요청
  const handleSubmit = async () => {
    const url = `/api/whiskey/review/register`;
    const data = {
      whiskeyId,
      starRating: rating,
      content,
    };
    try {
      await instance.post(url, data);
      alert("리뷰가 성공적으로 등록되었습니다.");
      dispatch(submitReview());
      closeModal()
    } catch (error) {
      console.error("리뷰 등록 실패", error);
    }
  };
  return (
    <div className={style.outerContainer}>
      <div>
        {[...Array(totalStars)].map((star, index) => {
          index += 1;
          return (
            <button
              className={style.starBox}
              type="button"
              key={index}
              onClick={() => handleSetRating(index)}
            >
              <span className={index <= rating ? style.on : style.off}>
                &#9733;
              </span>
            </button>
          );
        })}
      </div>

      <p>
        {rating}/{totalStars}
      </p>
      <textarea
        placeholder="여기에 리뷰를 입력하세요"
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <button className={style.submitButton} onClick={handleSubmit}>
        리뷰 쓰기
      </button>
    </div>
  );
};
export default CreateReview;
