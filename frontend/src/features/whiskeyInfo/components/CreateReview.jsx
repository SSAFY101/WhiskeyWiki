import style from "./CreateReview.module.css";
import { useState } from "react";
const CreateReview = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const handleSetRating = (index) => {
    setRating(index);
  };
  return (
    <div>
      {[...Array(totalStars)].map((star, index) => {
        index += 1;
        return (
          <button className={style.starContainer}
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
      <p>
        {rating}/{totalStars}
      </p>
    </div>
  );
};
export default CreateReview;
