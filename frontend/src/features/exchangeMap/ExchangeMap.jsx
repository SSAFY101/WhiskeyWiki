import React, { useState, useEffect } from "react";
import style from "./ExchangeMap.module.css";

// (문제) 스크립트로 kakao maps api를 가져오면, window전역 객체에 들어가게 된다.
// (해결) 함수형 컴포넌트에 인지시키고, window에서 kakao 객체를 뽑아서 사용 / window.kakao.~ 처럼 inline으로 사용하는 것도 방법!
const { kakao } = window;

function Map() {
  // 인포윈도우 관련 변수 (아래 코드 존재)
  // const [iwRemoveable, setIwRemoveable] = useState(true);

  // 클릭한 마커를 담을 변수
  // const [selectedMarker, setSelectedMarker] = useState(-1);

  useEffect(() => {
    const mapContaine = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(36.3550659, 127.2983779), //지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 1. 지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(mapContaine, options);

    // 2. 지도 이동시키는 함수
    function setCenter() {
      const moveLatLon = new kakao.maps.LatLng(36.3550659, 127.2983779); // 이동할 위도 경도 위치 생성
      map.setCenter(moveLatLon); // 지도 중심 이동
    }

    // 3. 여러개 마커 표시 - 마커를 표시할 위치(배열)
    const positions = [
      {
        // id: 0, // user_id 번호 사용하기
        content:
          '<div style="padding:5px; text-align: center;">' +
          "Jieun's My Bar" +
          "<br>" +
          ' <a href="https://galvanized-citron-903.notion.site/SSAFY-10-PJT-B101-1e8733a173fe4f3eae707f444d1d5940?pvs=4" style="color:black" target="_blank">' +
          "   이동" +
          " </a>" +
          "</div>",
        latlng: new kakao.maps.LatLng(36.3550659, 127.2983779),
      },
      {
        // id: 1,
        content:
          '<div style="padding:5px; text-align: center;">' +
          "주차장1's My Bar" +
          "<br>" +
          ' <a href="https://galvanized-citron-903.notion.site/SSAFY-10-PJT-B101-1e8733a173fe4f3eae707f444d1d5940?pvs=4" style="color:black" target="_blank">' +
          "   이동" +
          " </a>" +
          "</div>",
        latlng: new kakao.maps.LatLng(36.355838, 127.299748),
      },
      {
        // id: 2,
        content:
          '<div style="padding:5px; text-align: center;">' +
          "주차장2's My Bar" +
          "<br>" +
          ' <a href="https://galvanized-citron-903.notion.site/SSAFY-10-PJT-B101-1e8733a173fe4f3eae707f444d1d5940?pvs=4" style="color:black" target="_blank">' +
          "   이동" +
          " </a>" +
          "</div>",
        latlng: new kakao.maps.LatLng(36.354696, 127.300253),
      },
    ];

    // 4. 다른 이미지로 마커 생성
    const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소
      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지 옵션 : 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정

    // 마커의 이미지정보를 가지고 있는 마커이미지 생성
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    // function makeOverListener(map, marker, infowindow) {
    //   return function () {
    //     infowindow.open(map, marker);
    //   };
    // }

    // // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    // function makeOutListener(infowindow) {
    //   return function () {
    //     infowindow.close();
    //   };
    // }

    // 5. 마커 및 인포윈도우 생성
    for (let i = 0; i < positions.length; i++) {
      // 마커 생성
      const marker = new kakao.maps.Marker({
        // id,
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
        image: markerImage, // 마커이미지
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
      });
      // 마커에 고유 아이디 지정
      marker.id = i;

      // // 인포윈도우 끄는 버튼 (X 버튼)
      const iwRemoveable = true;
      // 마커에 표시할 인포윈도우 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
        removable: iwRemoveable, // 인포윈도우 끄는 버튼 넣기
      });
      // 인포윈도우에 고유 아이디 지정
      infowindow.id = i;

      // 6. 마커 클릭 이벤트 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // // 다른 마커가 이미 클릭되어 있으면, 기존의 인포윈도우 닫기 (후순위로..)
        // console.log(infowindow);
        // if (infowindow.id === i) {
        //   console.log("if문 실행 된다!");
        //   infowindow.close();
        // }

        // 마커 위에 인포윈도우를 표시
        infowindow.open(map, marker);
      });
    }
  }, []);

  return (
    <div className={`${style.map}`}>
      <div
        id="map"
        style={{
          width: "500px",
          height: "400px",
          border: "1px solid black",
        }}
      ></div>
    </div>
  );
}

export default Map;

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// // 다른 방법: Kakao Map  package install ( $ npm install react-kakao-maps-sdk )

// import { Map, MapMarker } from "react-kakao-maps-sdk";

// const TheaterLocation = () => {
//   return (
//     <div>
//       <Map
//         center={{ lat: 36.3550659, lng: 127.2983779 }}
//         style={{
//           width: "600px",
//           height: "500px",
//           // borderRadius: "20px",  // 가장자리 둥글게
//         }}
//       >
//         {/* //지도에 보여줄 위치 지정 (위도,경도) */}
//         <MapMarker
//           style={{ border: "tranparent" }}
//           position={{ lat: 36.3550659, lng: 127.2983779 }}
//         >
//           {/* //핀 찍힐 위치 */}
//           <div
//             style={{
//               color: "#9971ff",
//               fontSize: "19px",
//               fontWeight: "700",
//               borderRadius: "10px",
//               padding: "2.5px",
//             }}
//           >
//             "Whiskey Wiki"
//           </div>
//         </MapMarker>
//       </Map>
//     </div>
//   );
// };

// export default TheaterLocation;
