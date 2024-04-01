// import axios from "axios";
import instance from "../auth/axiosInterceptor";

function MyBarCheckEmpty({ whiskeyId, whiskeyNameKr, whiskeyNameEn }) {
  const checkEmpty = () => {
    // GET 요청: 위스키 보유 상태 확인
    instance({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/mybar/${whiskeyId}`,
    })
      .then((res) => {
        console.log("위스키 보유 상태 확인 성공 : ", res.data);
      })
      .catch((err) => {
        console.log("위스키 보유 상태 확인 ERROR :", err);
      });

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
  };
  return (
    <>
      {/* <p>{whiskeyId}</p> */}
      <p>
        {whiskeyNameKr}({whiskeyNameEn})
      </p>
      <p>빈 병으로 변경할까요?</p>
      <button onClick={checkEmpty}>확인</button>
    </>
  );
}

export default MyBarCheckEmpty;
