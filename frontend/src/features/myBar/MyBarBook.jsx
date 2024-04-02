import React, { useState } from "react";
import style from "./MyBarBook.module.css";

function MyBarBook() {
  return (
    <div className={style.container}>
      <div className={style.background}>
        {/* <button>&lt; 레시피 뒤로가기 버튼</button> */}
        <div className={style.recipe}>
          <h1>즐겨찾기한 칵테일이 없습니다.</h1>
          {/* <button>상세 정보 보기</button> */}
        </div>
      </div>
    </div>
  );
}

export default MyBarBook;
