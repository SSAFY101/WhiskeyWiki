// api : 채팅방 리스트
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import instance from "../auth/axiosInterceptor";

import Status from "./component/Status";

import style from "./css/ChatList.module.css";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    // 채팅방 리스트 조회
    instance
      .get(`/api/chatroom/list`)
      .then((res) => {
        console.log("채팅방 리스트", res);

        const data = res.data.data.chatRoomList;
        setChatList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`${style.container}`}>
      {/* 마이페이지 사이드 메뉴 */}
      <div className={`${style.sideMenu}`}>
        <div className={`${style.myPage}`}>마이페이지</div>
        <hr className={style.line} />
        <div className={`${style.menu}`}>
          <Link to="/userInfo">내 정보</Link>
          <div>채팅 목록</div>
        </div>
      </div>

      {/* 채팅 리스트 */}
      <div className={`${style.chatListContainer}`}>
        {chatList.length == 0 && <div>채팅방 리스트가 없습니다.</div>}
        {chatList.length > 0 &&
          chatList.map((chat) => (
            <Link
              to={`/chatRoom`}
              state={{
                chatRoomId: chat.chatroomId,
                pairNickname: chat.pairNickname,
              }}
            >
              <div className={`${style.chatContainer}`}>
                <div className={`${style.tradeStatus}`}>
                  <Status
                    userStatus={chat.userStatus}
                    pairStatus={chat.pairStatus}
                    canHover={false}
                  />
                </div>
                <div className={`${style.contentContainer}`}>
                  <div className={`${style.pairId}`}>{chat.pairNickname}</div>
                  <div className={`${style.lastMessagae}`}>
                    {chat.lastMassage}
                  </div>
                </div>
              </div>
              <hr className={style.line} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChatList;
