import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Status from "./component/Status";

import style from "./css/ChatList.module.css";

const ChatList = () => {
  const userId = 0; // Test

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    setChatList([
      {
        chatRoomId: 0,
        pair: "주정뱅이",
        lastMassage: "헤에에에에",
        userStatus: true,
        pairStatus: true,
      },
      {
        chatRoomId: 1,
        pair: "김싸피",
        lastMassage: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
        userStatus: true,
        pairStatus: false,
      },
      {
        chatRoomId: 2,
        pair: "헤에",
        lastMassage: "안녕하세요",
        userStatus: false,
        pairStatus: true,
      },
      {
        chatRoomId: 3,
        pair: "Hehehe",
        lastMassage: "헤헤ㅎㅎ",
        userStatus: false,
        pairStatus: false,
      },
    ]);
    // 채팅방 리스트 요청 / userId : 임시
    axios
      .get("/trade/rooms", userId, {
        headers: {
          accessToken: "토큰",
        },
      })
      .then((res) => {
        console.log("채팅방 리스트", res); // 테스트
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
        {chatList.map((chat) => (
          <Link to={`/chatRoom`} state={{ chatRoomId: chat.chatRoomId }}>
            <div className={`${style.chatContainer}`}>
              <div className={`${style.tradeStatus}`}>
                <Status
                  userStatus={chat.userStatus}
                  pairStatus={chat.pairStatus}
                  canHover={false}
                />
              </div>
              <div className={`${style.contentContainer}`}>
                <div className={`${style.pairId}`}>{chat.pair}</div>
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
