import { useEffect, useState } from "react";
import axios from "axios";

import Message from "./component/Message";

import style from "./css/MessageList.module.css";

import sendIcon from "./images/sendMessage.png";

const MessageList = () => {
  const [messageList, setMessageList] = useState([]);

  const 테스트 = [
    {
      id: 0,
      isMyMessage: false,
      content: "ㅎㅇ",
      time: "오전 10:03",
    },
    {
      id: 1,
      isMyMessage: false,
      content: "잭다니엘 내놔",
      time: "오전 10:03",
    },
    {
      id: 2,
      isMyMessage: true,
      content: "헤에",
      time: "오전 10:04",
    },
    {
      id: 3,
      isMyMessage: false,
      content: "잭다니엘 내놔",
      time: "오전 10:05",
    },
    {
      id: 4,
      isMyMessage: true,
      content: "헤에에에에",
      time: "오전 10:05",
    },
  ];
  const pairId = 0; // Temp

  // 채팅방 메세지 리스트 불러오기
  useEffect(() => {
    // axios
    //   .get(`http://localhost:8000/trade/room`, pairId, {
    //     headers: {
    //       accessToken: "토큰",
    //     },
    //   })
    //   .then((res) => {
    //     console.log("채팅방 메세지 리스트 불러오기", res);
    //     const data = res.data.data;
    //     setMessageList(data);
    //   })
    //   .catch((err) => {
    //     console.log("채팅방 메세지 리스트 불러오기 ERR", err);
    //   });
  }, []);

  // 메세지 보내기
  const [newMessage, setNewMessage] = useState("");

  const messageChangeHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const messageSendHandler = () => {
    if (newMessage.length === 0) {
      return;
    }
    console.log("메세지 보내기 클릭", newMessage);
  };

  return (
    <div className={`${style.container}`}>
      {/* 메세지 리스트 */}
      <div className={`${style.messageList}`}>
        {테스트.map((msg) => (
          <Message key={msg.id} {...msg}></Message>
        ))}
      </div>
      {/* 메세지 작성 */}
      <div className={`${style.messageCreate}`}>
        <div className={`${style.newMessage}`}>
          <textarea
            value={newMessage}
            onChange={messageChangeHandler}
            placeholder="메세지 보내기"
            spellCheck="false"
            maxLength="200"
          />
        </div>
        <img onClick={messageSendHandler} src={sendIcon} />
      </div>
    </div>
  );
};

export default MessageList;
