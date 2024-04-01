// 채팅방 메세지 리스트 불러오기
// 채팅방 나가기
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import style from "./css/Chat.module.css";

import MessageList from "./MessageList";
import WhiskeyList from "./WhiskeyList";
import Status from "./component/Status";

import backIcon from "./images/before.png";
import moreIcon from "./images/openModal.png";
import exitIcon from "./images/exit.png";
import { useSelector } from "react-redux";

const Chat = () => {
  const location = useLocation();
  const chatRoomId = location.state.chatRoomId;
  const pairNickname = location.state.pairNickname;
  const [pairId, setPairId] = useState(0);

  const userNickname = useSelector((state) => state.user.nickName);
  const userId = 0; // Temp

  const userStatus = false;
  const pairStatus = false;

  const [messageList, setMessageList] = useState([
    {
      chatId: 0, // message Id
      myMessage: false,
      content: "ㅎㅇ",
      dateTime: "2011-11-08 11:58",
    },
    {
      chatId: 1,
      myMessage: false,
      content: "잭다니엘 내놔",
      dateTime: "2023-11-08 11:58",
    },
    {
      chatId: 2,
      myMessage: true,
      content: "헤에",
      dateTime: "2024-03-08 11:58",
    },
    {
      chatId: 3,
      myMessage: false,
      content: "잭다니엘 내놔",
      dateTime: "2024-03-21 11:58",
    },
    {
      chatId: 4,
      myMessage: true,
      content: "헤에에에에",
      dateTime: "2024-03-21 16:00",
    },
  ]);

  useEffect(() => {
    // 채팅방 메세지 리스트 불러오기
    axios
      .get(`/chat/list/${chatRoomId}`)
      .then((res) => {
        console.log("채팅방 메세지 리스트 불러오기", res); // 테스트
        const chatList = res.data.data.chatList;
        const pairId = res.data.data.pairId;
        setMessageList(chatList);
        setPairId(pairId);
      })
      .catch((err) => {
        console.log("채팅방 메세지 리스트 불러오기 실패", err);
      });
  });

  const clickExitHandler = () => {
    if (window.confirm("채팅방에서 나가시겠습니까?")) {
      axios
        .delete(`/chatroom/${chatRoomId}`)
        .then((res) => {
          console.log("채팅방 나가기", res);
        })
        .catch((err) => {
          console.log("채팅방 나가기 실패", err);
        });
    }
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.top}`}>
        <Link to="/chat">
          <img src={backIcon} />
        </Link>
        <div className={`${style.nickName}`}>{pairId}</div>
        <div className={`${style.status}`}>
          <Status
            userStatus={userStatus}
            pairStatus={pairStatus}
            canHover={true}
          />
          <img src={exitIcon} onClick={clickExitHandler} />
        </div>
      </div>
      <hr className={style.line} />
      <div className={`${style.content}`}>
        <div className={`${style.whiskeyList}`}>
          <WhiskeyList userId={pairId} userNickname={pairNickname} />
          <WhiskeyList userId={userId} userNickname={userNickname} />
        </div>
        <div className={`${style.line2}`}></div>
        <MessageList messageListProp={messageList} />
      </div>
    </div>
  );
};

export default Chat;
