import style from "./CreateReview.module.css";
import { useState } from "react";
const CreateReview = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const handleSetRating = (index) => {
    setRating(index);
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
      <textarea placeholder="여기에 리뷰를 입력하세요"></textarea>
      <button className={style.submitButton}>리뷰 쓰기</button>
    </div>
  );
};
export default CreateReview;
