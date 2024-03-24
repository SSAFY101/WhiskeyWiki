import React, { useState } from "react";
import style from "./MyBarBook.module.css";

function MyBarBook() {
  return (
    <div className={style.container}>
      <div className={style.background}>
        {/* <button>&lt; 레시피 뒤로가기 버튼</button> */}
        <div className={style.recipe}>
          <p>칵테일 레시피 즐겨찾기 내용 울렐레~~</p>
          <p>(정렬테스트)</p>
          {/* <button>상세 정보 보기</button> */}
        </div>
      </div>
    </div>
  );
}

export default MyBarBook;
