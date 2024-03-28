function MyBarCheckEmpty() {
  const checkEmpty = () => {
    console.log("check Empty");
    // 빈병 표시하는 코드 작성하기 (ex.이미지의 투명도를 50%로 바꾸는 코드)
    // const whiskeyImage = document.getElementById("whiskeyImage");
    // whiskeyImage.style.opacity = 0.5;
    // 닫기 버튼과 동일한 기능을 하는 (이전 페이지로 돌아가는) 코드 작성 예정
  };
  return (
    <>
      <p>"위스키 이름"을(를) 빈 병으로 표시하시겠습니까?</p>
      <button onClick={checkEmpty}>확인</button>
    </>
  );
}

export default MyBarCheckEmpty;
