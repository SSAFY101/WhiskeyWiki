// api : 채팅방 메세지 리스트, 채팅방 나가기
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatAction } from "../../store/slices/chat";

import axios from "axios";
import instance from "../auth/axiosInterceptor";

import style from "./css/Chat.module.css";

import MessageList from "./MessageList";
import WhiskeyList from "./WhiskeyList";
import Status from "./component/Status";

import backIcon from "./images/before.png";
import moreIcon from "./images/openModal.png";
import exitIcon from "./images/exit.png";

const Chat = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const chatRoomIdprop = location.state.chatRoomId;
  const pairNicknameprop = location.state.pairNickname;

  const [pairId, setPairId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [pairNickname, setPairNickname] = useState(null);

  const userNickname = useSelector((state) => state.user.nickName);

  const userStatus = false;
  const pairStatus = false;

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    console.log("chatRoomIdprop", chatRoomIdprop);
    console.log("pairNicknameprop", pairNicknameprop);
    setChatRoomId(chatRoomIdprop);
    setPairNickname(pairNicknameprop);

    // 채팅방 메세지 리스트 불러오기
    instance
      .get(`/api/chat/list/${chatRoomIdprop}`)
      .then((res) => {
        console.log("채팅방 메세지 리스트 불러오기", res);

        const data = res.data.data;
        const chatList = data.chatList;
        const userId = data.userId;
        const pairId = data.pairId;

        setMessageList(chatList);
        setPairId(pairId);
        setUserId(userId);

        const pairWhiskeyList = getWhiskeyList(pairId);
        const userWhiskeyList = getWhiskeyList(userId);

        dispatch(chatAction.setPairWhiskeyList(pairWhiskeyList));
        dispatch(chatAction.setUserWhiskeyList(userWhiskeyList));

        setTimeout(() => {}, 2000);
      })
      .catch((err) => {
        console.log("채팅방 메세지 리스트 불러오기 실패", err);
      });
  }, []);

  // 다른 유저의 My Bar 조회
  const getWhiskeyList = (id) => {
    console.log("다른 유저 mybar try", id);
    instance
      .get(`/api/mybar/${id}`)
      .then((res) => {
        console.log("다른 유저의 My Bar 조회", res);

        const newWhiskeyList = res.data.data.whiskeyStatusList;

        return newWhiskeyList;
      })
      .catch((err) => {
        console.log("다른 유저의 My Bar 조회 실패", err);
      });
  };

  const clickExitHandler = () => {
    if (window.confirm("채팅방에서 나가시겠습니까?")) {
      instance
        .delete(`/api/chatroom/${chatRoomIdprop}`)
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
        <div className={`${style.nickName}`}>{pairNickname}</div>
        <div className={`${style.status}`}>
          <Status
            userStatus={userStatus}
            pairStatus={pairStatus}
            canHover={true}
            chatRoomId={chatRoomIdprop}
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
