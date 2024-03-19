import { Link } from "react-router-dom";

import style from "./css/Chat.module.css";

import MessageList from "./MessageList";
import WhiskeyList from "./WhiskeyList";
import backIcon from "./images/before.png";
import moreIcon from "./images/openModal.png";

const Chat = () => {
  const pairId = 1; // Temp
  const userId = 0; // Temp

  return (
    <div className={`${style.container}`}>
      <div className={`${style.top}`}>
        <Link to="/chat">
          <img src={backIcon} />
        </Link>
        <div className={`${style.nickName}`}>닉네임</div>
        <div className={`${style.status}`}>
          <select>
            <option value="거래전">거래전</option>
            <option value="거래전">거래중</option>
          </select>
          <img src={moreIcon} />
        </div>
      </div>
      <hr className={style.line} />
      <div className={`${style.content}`}>
        <div className={`${style.whiskeyList}`}>
          <WhiskeyList userId={pairId} />
          <WhiskeyList userId={userId} />
        </div>
        <div className={`${style.line2}`}></div>
        <MessageList />
      </div>
    </div>
  );
};

export default Chat;
