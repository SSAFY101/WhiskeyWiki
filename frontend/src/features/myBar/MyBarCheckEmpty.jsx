import React, { useState, useEffect } from "react";
// import axios from "axios";
import instance from "../auth/axiosInterceptor";

function MyBarCheckEmpty({
  whiskeyId,
  whiskeyNameKr,
  whiskeyNameEn,
  handleCloseCheckEmptyModal,
}) {
  // 1. 위스키 보유 상태 확인
  const [message, setMessage] = useState(""); // message 상태 추가
  useEffect(() => {
    // GET 요청: 위스키 보유 상태 확인
    instance({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/mybar/check-status/${whiskeyId}`,
    })
      .then((res) => {
        // console.log("위스키 보유 상태 확인 성공 : ", res.data.data.isEmpty);
        const isEmpty = res.data.data.isEmpty;
        if (isEmpty) {
          // 보유 상태 => 빈병으로 변경
          setMessage("빈 병으로 변경할까요?");
        } else {
          // 빈병 상태 => 보유 상태로 변경
          setMessage("술병을 다시 채울까요?");
        }
      })
      .catch((err) => {
        console.log("위스키 보유 상태 확인 ERROR :", err);
      });
  }, []);

  // 2. 위스키 보유 상태 변경 함수
  const changeStatus = () => {
    // POST 요청: 위스키 보유 상태 관리 (보유 <-> 빈병 변경)
    instance({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/mybar/status/${whiskeyId}`,
    })
      .then((res) => {
        // console.log("위스키 상태 변경 성공 : ", res.data);
      })
      .catch((err) => {
        console.log("위스키 상태 변경 ERROR :", err);
      });

    // 모달 종료 코드
    handleCloseCheckEmptyModal();
  };
  return (
    <>
      {/* <p>{whiskeyId}</p> */}
      <p>
        {whiskeyNameKr}({whiskeyNameEn})
      </p>

      <p>{message}</p>

      <button onClick={changeStatus}>확인</button>
    </>
  );
}

export default MyBarCheckEmpty;
