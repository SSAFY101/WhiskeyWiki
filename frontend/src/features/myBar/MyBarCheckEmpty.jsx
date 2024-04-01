function MyBarCheckEmpty({ whiskeyId, whiskeyNameKr, whiskeyNameEn }) {
  const checkEmpty = () => {
    console.log("check Empty");
    // POST 요청: 위스키 보유 상태 관리 (보유/빈병 변경)
    // axios({
    //   method: "post",
    //   url: "api/mybar/status/{whiskeyId}",
    // })
    //   .then((res) => {
    //     console.log("위스키 상태 변경 성공 : ", res.data);
    //   })
    //   .catch((err) => {
    //     console.log("위스키 상태 변경 ERROR :", err);
    //   });
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
