import { useEffect, useState } from "react";

import style from "../css/ChatList.module.css";

const Status = ({ userStatus, pairStatus, canHover }) => {
  const [status, setStatus] = useState("");
  const [textColor, setTextColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    figureStatus(userStatus, pairStatus);
  }, [hover]);

  const figureStatus = (user, pair) => {
    if (!user && !pair) {
      if (canHover && hover) {
        setStatus("거래신청");
        setTextColor("#ffffff");
        setBgColor("#EEB233");
      } else {
        setStatus("채팅중");
        setTextColor("#3c3c3c");
        setBgColor("#999999");
      }
    } else if (user && !pair) {
      if (canHover && hover) {
        setStatus("신청취소");
        setTextColor("#a5a5a5");
        setBgColor("#605d5d");
      } else {
        setStatus("신청중");
        setTextColor("#3c3c3c");
        setBgColor("#999999");
      }
    } else if (!user && pair) {
      if (canHover && hover) {
        setStatus("수락하기");
        setTextColor("#ffffff");
        setBgColor("#EEB233");
      } else {
        setStatus("신청받음");
        setTextColor("#000000");
        setBgColor("#cccccc");
      }
    } else if (user && pair) {
      if (canHover && hover) {
        setStatus("거래취소");
        setTextColor("#a5a5a5");
        setBgColor("#605d5d");
      } else {
        setStatus("거래중");
        setTextColor("#E3E3E3");
        setBgColor("#FF5B5B");
      }
    }
  };

  const clickHandler = () => {
    if (!canHover) return;
    if (!userStatus && !pairStatus) {
      // 요청
    } else if (userStatus && !pairStatus) {
      // 요청 취소
    } else if (!userStatus && pairStatus) {
      // 요청 거절
      // 요청 수락
    } else if (userStatus && pairStatus) {
      // 거래 취소
    }
  };

  const mouseEnterHandler = () => {
    setHover(true);
  };

  const mouseLeaveHandler = () => {
    setHover(false);
  };

  return (
    <div
      className={`${style.statusContainer}`}
      style={{ backgroundColor: bgColor }}
      onClick={clickHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div style={{ color: textColor }}>{status}</div>
    </div>
  );
};

export default Status;
