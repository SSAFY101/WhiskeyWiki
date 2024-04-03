// api : 거래 상태 변경
import { useEffect, useState } from "react";

import style from "../css/ChatList.module.css";
import instance from "../../auth/axiosInterceptor";

const Status = ({ userStatus, pairStatus, canHover, chatRoomId, userId }) => {
  const [status, setStatus] = useState("");
  const [textColor, setTextColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    figureStatus(userStatus, pairStatus);
  }, [hover]);

  // 거래 상태 변경
  const statusChange = (requestType) => {
    instance
      .put(`/api/chatroom/status`, {
        chatRoomId,
        userId,
        requestType,
      })
      .then((res) => {
        console.log("거래 상태 변경", res);
      })
      .catch((err) => {
        console.log("거래 상태 변경 실패", err);
      });
  };

  // 클릭 시 요청
  const clickHandler = () => {
    const requestType = null;

    if (!canHover) return;
    if (!userStatus && !pairStatus) {
      // 요청
      if (window.confirm("거래 요청을 보낼까요?")) {
        requestType = "요청";
      }
    } else if (userStatus && !pairStatus) {
      // 요청 취소
      if (window.confirm("거래 요청을 취소할까요?")) {
        requestType = "요청 취소";
      }
    } else if (!userStatus && pairStatus) {
      // 수락, 거절
      if (window.confirm("거래 요청을 수락할까요?")) {
        requestType = "수락";
      } else {
        requestType = "거절";
      }
    } else if (userStatus && pairStatus) {
      // 거래 취소
      if (window.confirm("정말 거래를 취소할까요?")) {
        requestType = "거래 취소";
      }
    }
    if (!requestType) return;

    statusChange(requestType); // 거래 상태 변경 요청
  };

  // status별 설정
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
        setStatus("수락/거절");
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
