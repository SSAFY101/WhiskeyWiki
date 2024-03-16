import style from "../css/Message.module.css";

const Message = ({ id, isMyMessage, content, time }) => {
  return (
    <div className={`${style.container}`}>
      {/* 내 메세지 */}
      {isMyMessage && (
        <div className={`${style.myMessage}`}>
          <div className={`${style.time}`}>{time}</div>
          <div className={`${style.content}`}>{content}</div>
        </div>
      )}
      {/* 상대 메세지 */}
      {!isMyMessage && (
        <div className={`${style.yourMessage}`}>
          <div className={`${style.content}`}>{content}</div>
          <div className={`${style.time}`}>{time}</div>
        </div>
      )}
    </div>
  );
};

export default Message;
