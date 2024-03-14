// import React, { useEffect } from "react";
// // const { kakao } = window;

// function Map() {
//   console.log("여기까지는 된다");

//   useEffect(() => {
//     const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
//     const options = {
//       center: new window.kakao.maps.LatLng(36.3550659, 127.2983779), //지도의 중심좌표
//       level: 3,
//     };
//     const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
//   }, []);

//   return (
//     <div
//       id="map"
//       style={{
//         width: "500px",
//         height: "400px",
//         border: "1px solid black",
//       }}
//     ></div>
//   );
// }

// export default Map;

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

import React, { useEffect, useRef, useState } from "react";

function KakaoMap() {
  const containerRef = useRef(null);
  const [map, setMap] = useState(null);
  const API_KEY = "b17c4e53f55672ce6e6b6644da6ecc84";

  // 카카오맵 초기화 함수
  const initializeMap = () => {
    // const container = document.getElementById("map");
    const container = containerRef.current;

    // 컨테이너 DOM 요소가 아직 로드되지 않았다면 초기화를 지연합니다.
    if (!container) {
      console.error("Map container not found");
      //   setTimeout(initializeMap, 100);
      return;
    }

    // 지도 옵션을 설정합니다.
    const options = {
      center: new window.kakao.maps.LatLng(36.3550659, 127.2983779), // 초기 중심 좌표
      level: 3, // 초기 줌 레벨
    };

    // 컨테이너 DOM 요소에 지도를 생성합니다.
    const map = new window.kakao.maps.Map(container, options);
    setMap(map);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
        // const placesService = new window.kakao.maps.services.Places();
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="map"
      ref={containerRef}
      style={{ width: "500px", height: "400px", border: "1px solid black" }}
    />
  );
}

export default KakaoMap;
