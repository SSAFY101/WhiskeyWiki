import { Link } from "react-router-dom";

import Chat from "./Chat";

const ChatList = () => {
  return (
    <div>
      <div>ChatList</div>
      <Link to="/chat/0">채팅 (테스트)</Link>
    </div>
  );
};

export default ChatList;
