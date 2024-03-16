import style from "./css/Chat.module.css";

import MessageList from "./MessageList";
import WhiskeyList from "./WhiskeyList";
import backIcon from "./images/before.png";
import moreIcon from "./images/openModal.png";

const Chat = () => {
  // className={`${style.}`}
  return (
    <div className={`${style.container}`}>
      <div className={`${style.top}`}>
        <img src={backIcon} />
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
        <WhiskeyList />
        <div className={`${style.whiskeyList}`}></div>
        <MessageList />
      </div>
    </div>
  );
};

export default Chat;
