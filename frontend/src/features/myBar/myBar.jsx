import React, { useState } from "react";
import "./myBar.module.css";

function MyBar() {
  const MyBarBackground = {
    backgroundImage: `url("/images/locker.png")`,
    backgroundSize: "cover",
    margin: 0,
    padding: 0,
    width: "100%", // 페이지 폭 전체로 설정
    height: "100vh", // 페이지 높이 전체로 설정 (뷰포트 높이만큼)
  };

  const whiskeyStyles = [
    {
      position: "absolute", // 배경 이미지와 겹치도록 설정
      bottom: "28.3%", // 아래쪽으로 정렬
      left: "5%", // 왼쪽으로 정렬
      // right: '0%', // 오른쪽으로 정렬
      width: "80px", // 이미지의 너비 설정
      height: "auto", // 이미지의 높이 자동 조정
      cursor: "pointer", // 클릭 가능하도록 커서 스타일 변경
    },
    {
      position: "absolute",
      bottom: "28.3%",
      left: "30%",
      // right: '50%',
      width: "80px",
      height: "auto",
      cursor: "pointer",
    },
    {
      position: "absolute",
      bottom: "27.9%",
      // left: '90%',
      right: "0%",
      width: "70px",
      height: "auto",
      cursor: "pointer",
    },
  ];

  // 위스키 이미지 경로
  const WhiskeyImages = [
    "/images/whiskey/JimBeam.png",
    "/images/whiskey/Ballantines.png",
    "/images/whiskey/JohnnieWalker.png",
  ];

  // 위스키 이미지 클릭 이벤트 핸들러 함수들
  const clickWhiskeys = [
    () => console.log("Whiskey 클릭 이벤트 발생 1"),
    () => console.log("Whiskey 클릭 이벤트 발생 2"),
    () => console.log("Whiskey 클릭 이벤트 발생 3"),
  ];

  return (
    <div style={MyBarBackground}>
      {WhiskeyImages.map((path, index) => (
        <img
          key={index}
          src={path}
          alt=""
          style={whiskeyStyles[index]}
          onClick={clickWhiskeys[index]}
        />
      ))}
    </div>
  );

  // return (
  //   <div className="myBar-background">
  //     {WhiskeyImages.map((path, index) => (
  //       <img
  //         key={index}
  //         src={path}
  //         alt=""
  //         className="whiskey-image"
  //         // className={`whiskey-image whiskey-image-${index}`}
  //         onClick={clickWhiskeys[index]}
  //       />
  //     ))}
  //   </div>
  // );
}

export default MyBar;
