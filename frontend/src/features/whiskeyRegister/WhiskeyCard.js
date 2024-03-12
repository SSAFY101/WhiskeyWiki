import { useState } from "react";

const WhiskeyCard = ({ name, abv, price }) => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div style={{ margin: "1rem" }}>
      <div>{name}</div>
      <div onClick={toggleHandler}>더보기</div>
      {toggle && (
        <div>
          <div>{abv}도</div>
          <div>{price}원</div>
        </div>
      )}
    </div>
  );
};

export default WhiskeyCard;
