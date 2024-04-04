// 다른 유저의 My Bar 조회
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import instance from "../auth/axiosInterceptor";

import Whiskey from "./component/Whiskey";
import style from "./css/WhiskeyList.module.css";

const WhiskeyList = ({ userId, userNickname }) => {
  const nickName = useSelector((state) => state.user.nickName);
  const reduxUserList = useSelector((state) => state.chat.userWhiskeyList);
  const reduxPairList = useSelector((state) => state.chat.pairWhiskeyList);

  useEffect(() => {}, []);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.title}`}>
        <span>{userNickname}</span>님의 술
      </div>
      {/* 나 */}
      {nickName == userNickname && (
        <div className={`${style.whiskeyList}`}>
          {reduxUserList &&
            reduxUserList.map((whiskey) => (
              <Whiskey key={whiskey.WhiskeyNameEn} {...whiskey} />
            ))}
        </div>
      )}

      {/* 상대 */}
      {nickName != userNickname && (
        <div className={`${style.whiskeyList}`}>
          {reduxPairList &&
            reduxPairList.map((whiskey) => (
              <Whiskey key={whiskey.WhiskeyNameEn} {...whiskey} />
            ))}
        </div>
      )}
    </div>
  );
};

export default WhiskeyList;
