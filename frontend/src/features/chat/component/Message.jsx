import { useEffect, useState } from "react";
import style from "../css/Message.module.css";

const Message = ({ chatId, myMessage, content, dateTime }) => {
  useEffect(() => {
    calcTime();
  }, []);

  // 시간 처리
  const [newTime, setNewTime] = useState("");

  const calcTime = () => {
    // 메세지 시간
    const time = new Date(dateTime);
    const hour = time.getHours();
    const minute = time.getMinutes();

    // 현재 시간
    const now = new Date();

    // 계산
    const secondDifference = Math.floor((now - time) / 1000);

    // 1일 = 86400
    // 1주(7일) = 604,800
    // 1달(30일) = 2592000
    // 1년(365일) = 31536000
    if (secondDifference < 86400) {
      // 오후
      if (hour > 12) {
        setNewTime(
          "오후 " + hour.toString() + "시 " + minute.toString() + "분"
        );
      }
      // 오전
      else {
        setNewTime(
          "오전 " + hour.toString() + "시 " + minute.toString() + "분"
        );
      }
    } else if (secondDifference < 2592000) {
      const dayAgo = Math.floor(secondDifference / 86400);
      setNewTime(dayAgo.toString() + "일 전");
    } else if (secondDifference < 31536000) {
      const monthAgo = Math.floor(secondDifference / 2592000);
      setNewTime(monthAgo.toString() + "달 전");
    } else {
      const yearAgo = Math.floor(secondDifference / 31536000);
      setNewTime(yearAgo.toString() + "년 전");
    }
  };

  return (
    <div className={`${style.container}`}>
      {/* 내 메세지 */}
      {myMessage && (
        <div className={`${style.myMessage}`}>
          <div className={`${style.time}`}>{newTime}</div>
          <div className={`${style.content}`}>{content}</div>
        </div>
      )}
      {/* 상대 메세지 */}
      {!myMessage && (
        <div className={`${style.yourMessage}`}>
          <div className={`${style.content}`}>{content}</div>
          <div className={`${style.time}`}>{newTime}</div>
        </div>
      )}
    </div>
  );
};

export default Message;
