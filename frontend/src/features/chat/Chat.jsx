// api : 채팅방 메세지 리스트, 채팅방 나가기
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import instance from "../auth/axiosInterceptor";

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

  const chatRoomIdprop = location.state.chatRoomId;
  const pairNicknameprop = location.state.pairNickname;

  const [pairId, setPairId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [pairNickname, setPairNickname] = useState(null);

  const userNickname = useSelector((state) => state.user.nickName);

  const userStatus = false;
  const pairStatus = false;

  const [messageList, setMessageList] = useState([
    // {
    //   chatId: 0, // message Id
    //   myMessage: false,
    //   content: "ㅎㅇ",
    //   dateTime: "2011-11-08 11:58",
    // },
    // {
    //   chatId: 1,
    //   myMessage: false,
    //   content: "잭다니엘 내놔",
    //   dateTime: "2023-11-08 11:58",
    // },
  ]);

  useEffect(() => {
    console.log("chatRoomIdprop", chatRoomIdprop);
    console.log("pairNicknameprop", pairNicknameprop);
    setChatRoomId(chatRoomIdprop);
    setPairNickname(pairNicknameprop);

    // 채팅방 메세지 리스트 불러오기
    instance
      .get(`/api/chat/list/${chatRoomId}`)
      .then((res) => {
        console.log("채팅방 메세지 리스트 불러오기", res);

        const data = res.data.data;
        const chatList = data.chatList;
        const userId = data.userId;
        const pairId = data.pairId;

        setMessageList(chatList);
        setPairId(pairId);
        setUserId(userId);
      })
      .catch((err) => {
        console.log("채팅방 메세지 리스트 불러오기 실패", err);
      });
  }, []);

  const clickExitHandler = () => {
    if (window.confirm("채팅방에서 나가시겠습니까?")) {
      instance
        .delete(`/api/chatroom/${chatRoomId}`)
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
            chatRoomId={chatRoomId}
            userId={userId}
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
        <MessageList
          messageListProp={messageList}
          chatRoomId={chatRoomId}
          userId={userId}
          pairId={pairId}
        />
      </div>
    </div>
  );
};

export default Chat;
