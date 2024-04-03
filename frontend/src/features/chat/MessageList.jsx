import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";

import instance from "../auth/axiosInterceptor";

import Message from "./component/Message";
import style from "./css/MessageList.module.css";
import sendIcon from "./images/sendMessage.png";

const MessageList = ({ messageListProp, chatRoomId, userId, pairId }) => {
  const messageListRef = useRef();
  const messageListEndRef = useRef();
  const client = useRef({});

  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  console.log("prop", messageListProp);
  console.log(messageList);

  useEffect(() => {
    // 받아온 메세지 리스트
    setMessageList(messageListProp);

    // 소켓 연결
    connect();

    // 소켓 연결 해제
    return () => disconnect();
  }, []);

  useEffect(() => {
    messageListEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  // 소켓 : connect
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "wss://www.whiskeywiki.shop/api/ws",
      connectHeaders: {
        accessToken: instance.defaults.headers.common["Authorization"],
      },
      debug: (str) => {
        console.log("debug : ", str); // 테스트
      },
      onConnect: (frame) => {
        console.log("소켓 연결 성공", frame);
        subscribe();
      },
      onStompError: (frame) => {
        console.log("소켓 연결 실패", frame);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    client.current.activate();
  };

  // 소켓 : disconnect
  const disconnect = () => {
    client.current.deactivate();
  };

  // 소켓 : subscribe
  const subscribe = () => {
    client.current.subscribe("/sub/chatroom/" + chatRoomId, (data) => {
      const res = JSON.parse(data.body);

      console.log("subscribe res", res); // 테스트

      setMessageList((messageList) => [...messageList, res]);
    });
  };

  // 소켓 : publish
  const publish = (msg) => {
    if (!client.current.connected) return; // 소켓 연결이 안 된 경우

    client.current.publish({
      destination: "/pub/chatroom",
      body: JSON.stringify({
        chatRoomId,
        userId,
        content: msg,
      }),
    });

    // setMessageList((messageList) => [
    //   ...messageList,
    //   {
    //     id: 5,
    //     myMessage: true,
    //     content: msg,
    //     dateTime: new Date(),
    //   },
    // ]);
  };

  // 메세지 상태
  const messageChangeHandler = (e) => {
    setNewMessage(e.target.value);
  };

  // 매세지 전송
  const messageSendHandler = (e) => {
    e.preventDefault();

    if (newMessage.length === 0) return; // 메세지 길이가 0인 경우

    console.log("메세지 보내기", newMessage); // 테스트

    publish(newMessage);
    setNewMessage("");
  };

  // 엔터키 입력
  const enterPressHandler = (e) => {
    if (e.key === "Enter") {
      messageSendHandler(e);
    }
  };

  return (
    <div className={`${style.container}`}>
      {/* 메세지 리스트 */}
      <div className={`${style.messageList}`} ref={messageListRef}>
        {messageList &&
          messageList.map((msg) => (
            <Message key={msg.chatId} {...msg}></Message>
          ))}
        <div ref={messageListEndRef}></div>
      </div>
      {/* 메세지 작성 */}
      <div className={`${style.messageCreate}`}>
        <div className={`${style.newMessage}`}>
          <textarea
            value={newMessage}
            onChange={messageChangeHandler}
            onKeyPress={enterPressHandler}
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
