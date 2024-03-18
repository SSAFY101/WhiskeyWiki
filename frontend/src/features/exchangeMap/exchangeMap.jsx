import React, { useEffect } from "react";
import style from "./ExchangeMap.module.css";

// (문제) 스크립트로 kakao maps api를 가져오면, window전역 객체에 들어가게 된다.
// (해결) 함수형 컴포넌트에 인지시키고, window에서 kakao 객체를 뽑아서 사용
const { kakao } = window;

function Map() {
  useEffect(() => {
    const mapContaine = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(36.3550659, 127.2983779), //지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 1. 지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(mapContaine, options);

    // 2. 지도 이동시키기
    function setCenter() {
      // 이동할 위도 경도 위치를 생성합니다
      const moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
      // 지도 중심을 이동 시킵니다
      map.setCenter(moveLatLon);
    }

    // 3. 다른 이미지로 마커 생성하기
    const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(36.3550659, 127.2983779); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 4. 클릭 이벤트 등록
    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    const iwContent = '<div style="padding:5px;">Whiskey Wiki</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow.open(map, marker);
    });

    // 5. 여러개 마커 표시하기
    // 마커를 표시할 위치와 title 객체 배열입니다
    const positions = [
      {
        title: "카카오",
        latlng: new kakao.maps.LatLng(33.450705, 126.570677),
      },
      {
        title: "생태연못",
        latlng: new kakao.maps.LatLng(33.450936, 126.569477),
      },
      {
        title: "텃밭",
        latlng: new kakao.maps.LatLng(33.450879, 126.56994),
      },
      {
        title: "근린공원",
        latlng: new kakao.maps.LatLng(33.451393, 126.570738),
      },
    ];
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

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// import React, { useEffect, useRef, useState } from "react";

// function KakaoMap() {
//   const containerRef = useRef(null);
//   const [map, setMap] = useState(null);
//   const API_KEY = "b17c4e53f55672ce6e6b6644da6ecc84";

//   // 카카오맵 초기화 함수
//   const initializeMap = () => {
//     // const container = document.getElementById("map");
//     const container = containerRef.current;

//     // 컨테이너 DOM 요소가 아직 로드되지 않았다면 초기화를 지연합니다.
//     if (!container) {
//       console.error("Map container not found");
//       //   setTimeout(initializeMap, 100);
//       return;
//     }

//     // 지도 옵션을 설정합니다.
//     const options = {
//       center: new window.kakao.maps.LatLng(36.3550659, 127.2983779), // 초기 중심 좌표
//       level: 3, // 초기 줌 레벨
//     };

//     // 컨테이너 DOM 요소에 지도를 생성합니다.
//     const map = new window.kakao.maps.Map(container, options);
//     setMap(map);
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
//     script.async = true;

//     script.onload = () => {
//       window.kakao.maps.load(() => {
//         initializeMap();
//         // const placesService = new window.kakao.maps.services.Places();
//       });
//     };

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div
//       id="map"
//       ref={containerRef}
//       style={{ width: "500px", height: "400px", border: "1px solid black" }}
//     />
//   );
// }

// export default KakaoMap;
