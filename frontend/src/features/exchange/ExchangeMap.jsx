import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./ExchangeMap.module.css";
// import axios from "axios";
import instance from "../auth/axiosInterceptor";

// (문제) 스크립트로 kakao maps api를 가져오면, window전역 객체에 들어가게 된다.
// (해결) 함수형 컴포넌트에 인지시키고, window에서 kakao 객체를 뽑아서 사용 / window.kakao.~ 처럼 inline으로 사용하는 것도 방법!
const { kakao } = window;

function Map() {
  const infowindowList = []; // 인포윈도우를 담을 변수
  const [mybarList, setMybarList] = useState([]); // API Response 담을 변수 (빈 배열)

  // 8. Redux 활용 => checkedWhiskeyList 를 받아오기
  const checkedWhiskeyList = useSelector(
    (state) => state.exchange.checkedWhiskeyList
  );

  useEffect(() => {
    // console.log("useEffect 1 시작");
    // console.log(checkedWhiskeyList); // Redux 작동 test

    // 9. POST 요청: 다른 유저의 My Bar 리스트 조회 (검색 조건에 따라)
    instance({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/map/search-condition`,
      data: {
        checkedWhiskeyList,
      },
    })
      .then((res) => {
        // console.log("인식 위스키 정보 : ", res.data.data);
        const data = res.data.data;
        setMybarList(data);
      })
      .catch((err) => {
        console.log("다른 유저의 My Bar 리스트 정보 ERROR :", err);
      });

    // // axios 요청으로 받아 온 결과 (예시)
    // setMybarList([
    //   {
    //     userId: 1,
    //     nickname: "Jieun",
    //     latitude: 36.355065,
    //     longitude: 127.298377,
    //   },
    //   {
    //     userId: 2,
    //     nickname: "주차장1",
    //     latitude: 36.355838,
    //     longitude: 127.299748,
    //   },
    //   {
    //     userId: 3,
    //     nickname: "주차장2",
    //     latitude: 36.354696,
    //     longitude: 127.300253,
    //   },
    // ]);

    // console.log("useEffect 1 끝");
  }, []);

  useEffect(() => {
    // console.log("useEffect 2 시작");
    // console.log(mybarList); // mybarList 확인

    // 1. 지도 생성 및 객체 리턴
    const mapContainer = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스

    const options = {
      center: new kakao.maps.LatLng(36.355065, 127.298377), // 지도의 중심좌표 (추후 사용자의 주소로 변경 예정)
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, options);

    // 2. 지도 이동시키는 함수
    function setCenter() {
      const moveLatLon = new kakao.maps.LatLng(36.355065, 127.298377); // 이동할 위도 경도 위치 생성
      map.setCenter(moveLatLon); // 지도 중심 이동
    }

    // 10. 마커 클릭 시, 다른 유저의 My bar로 이동하는 함수 [10-방법1) button 사용 관련] => a태그로 코드 변경해서, 주석 처리!
    // function goToBar(userId) {
    //   console.log(userId);
    // }
    // window.goToBar = goToBar; // window.goToBar에 goToBar 함수 할당: window 객체에 goToBar 함수를 할당하여 전역 범위에서 이 함수에 접근할 수 있도록 만듦.

    // 3. 여러개 마커 표시 - 마커를 표시할 위치(배열)
    const positions = mybarList.map((bar) => ({
      content:
        '<div style="padding:5px; text-align: center;">' +
        `${bar.nickname}'s My Bar` +
        "<br>" +
        // 10. 방법1) button 사용
        // `<button onclick=goToBar(${bar.userId})>` +
        // "이동" +
        // "</button>" +

        // 10. 방법2) a태그 사용
        `<a href="/mybarOther?userId=${bar.userId}" style="color:black" target="_blank">` +
        "이동" +
        "</a>" +
        "</div>",

      latlng: new kakao.maps.LatLng(bar.latitude, bar.longitude),
    }));

    // 4. 다른 이미지로 마커 생성
    const imageSrc = "https://cdn-icons-png.flaticon.com/512/6508/6508614.png", // 마커이미지의 주소 (url로 입력하면 커스텀 가능)
      // imageSize = new kakao.maps.Size(63, 65), // 마커이미지의 크기
      imageSize = new kakao.maps.Size(81.5, 84.5), // 마커이미지의 크기 수정
      imageOption = { offset: new kakao.maps.Point(37, 95) }; // 마커이미지 옵션 : 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정

    // 마커의 이미지정보를 가지고 있는 마커이미지 생성
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

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

      // 인포윈도우 끄는 버튼 (X 버튼)
      const iwRemoveable = true;
      // 마커에 표시할 인포윈도우 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
        removable: iwRemoveable, // 인포윈도우 끄는 버튼 넣기
      });
      // 인포윈도우 리스트에 담기
      infowindowList[i] = infowindow;

      // 6. 마커 클릭 이벤트 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 기존의 인포윈도우 모두 닫기
        for (let i = 0; i < infowindowList.length; i++) {
          infowindowList[i].close();
        }
        // 마커 위에 인포윈도우를 표시
        infowindow.open(map, marker);
      });
    }

    // 7. 현재 위치 표시
    // 7-1. HTML5의 geolocation으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치 얻어오기
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        // // (옵션1) 현재위치 마커 표시
        // const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
        // const message = '<div style="padding:0px; margin:10px;">🥃 현재 위치 🥃</div>'; // 인포윈도우에 표시될 내용
        // currentMarker(locPosition, message); // 마커와 인포윈도우 표시
        // // (옵션2) 현재위치 표시 마커 이미지 변경 설정
        // var imageSrc =
        //     "https://cdn-icons-png.flaticon.com/512/11542/11542151.png", // 마커이미지 주소
        //   imageSize = new kakao.maps.Size(30, 30), // 마커이미지 크기
        //   imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지 옵션

        // // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
        // var markerImage = new kakao.maps.MarkerImage(
        //     imageSrc,
        //     imageSize,
        //     imageOption
        //   ),
        const markerPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치
        // // 마커 생성
        // var marker = new kakao.maps.Marker({
        //   position: markerPosition,
        //   image: markerImage, // 마커이미지 설정
        // });
        // // 마커가 지도 위에 표시되도록 설정
        // marker.setMap(map);

        // 지도의 중심좌표 이동
        map.setCenter(markerPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때, 마커 표시 위치와 인포윈도우 내용을 설정
      // GET 요청: 유저의 My bar 위치 조회
      instance({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/map/location`,
      })
        .then((res) => {
          console.log("인식 위스키 정보 : ", res.data.data);
          const data = res.data.data;
          const lat = data.latitude;
          const lon = data.longitude;
          // // (옵션1) 현재위치 마커 표시
          // const locPosition = new kakao.maps.LatLng(lat, lon);
          // const message = "사용자가 등록한 주소";
          // currentMarker(locPosition, message);
          // // (옵션2) 현재위치 표시 마커 이미지 변경 설정
          // var imageSrc =
          //     "https://cdn-icons-png.flaticon.com/512/11542/11542151.png", // 마커이미지 주소
          //   imageSize = new kakao.maps.Size(30, 30), // 마커이미지 크기
          //   imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지 옵션
          // // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
          // var markerImage = new kakao.maps.MarkerImage(
          //     imageSrc,
          //     imageSize,
          //     imageOption
          //   ),
          const markerPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치
          // // 마커 생성
          // var marker = new kakao.maps.Marker({
          //   position: markerPosition,
          //   image: markerImage, // 마커이미지 설정
          // });
          // // 마커가 지도 위에 표시되도록 설정
          // marker.setMap(map);

          // 지도의 중심좌표 이동
          map.setCenter(markerPosition);
        })
        .catch((err) => {
          console.log("다른 유저의 My Bar 리스트 정보 ERROR :", err);
          const locPosition = new kakao.maps.LatLng(36.3550659, 127.2983779);
          const message = "사용자와 MyBar의 위치를 알 수 없습니다.";
          currentMarker(locPosition, message);
        });
    }

    // 7-2. 지도에 현재 위치에 대한 마커 & 인포윈도우를 표시하는 함수
    function currentMarker(locPosition, message) {
      // 마커 생성
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      const iwContent = message; // 인포윈도우에 표시할 내용
      const iwRemoveable = true;

      // 인포윈도우 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경
      map.setCenter(locPosition);
    }

    // console.log("useEffect 2 끝");
  }, [mybarList]);

  return (
    <div className={`${style.map}`}>
      <div
        id="map"
        style={{
          width: "900px",
          height: "460px",
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
