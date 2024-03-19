import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Chat from "./Chat";

import style from "./css/ChatList.module.css";

const ChatList = () => {
  const userId = 0; // Test

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    setChatList([
      {
        id: 0,
        pairId: "주정뱅이",
        lastMessagae: "헤에에에에",
        tradeStatus: "거래중",
      },
      {
        id: 1,
        pairId: "김싸피",
        lastMessagae: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
        tradeStatus: "",
      },
    ]);
    // 채팅방 리스트 요청
    axios
      .get("요청 주소", userId, {
        headers: {
          accessToken: "토큰",
        },
      })
      .then((res) => {
        console.log("채팅방 리스트", res);

        const data = res.data.data;

        setChatList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.sideMenu}`}>
        <div className={`${style.myPage}`}>마이페이지</div>
        <hr className={style.line} />
        <div className={`${style.menu}`}>
          <Link to="/">내 정보</Link>
          <div>채팅 목록</div>
        </div>
      </div>
      <div className={`${style.chatListContainer}`}>
        {chatList.map((chat) => (
          <Link to={`/chat/${chat.id}`}>
            <div className={`${style.chatContainer}`}>
              <div
                className={`${style.tradeStatus}`}
                style={{
                  visibility: chat.tradeStatus === "거래중" ? "" : "hidden",
                }}
              >
                거래중
              </div>
              <div className={`${style.pairId}`}>{chat.pairId}</div>
              <div className={`${style.lastMessagae}`}>{chat.lastMessagae}</div>
            </div>
            <hr className={style.line} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
