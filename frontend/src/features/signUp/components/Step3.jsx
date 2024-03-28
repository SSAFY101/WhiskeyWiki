import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../../store/slices/signup";
import { useDaumPostcodePopup } from "react-daum-postcode";

import style from "../css/Signup.module.css";

import progressIcon from "../images/step3.png";
import icon1 from "../images/step3_1.png";
import icon2 from "../images/step3_2.png";
import line from "../images/line.png";
import warningIcon from "../images/warning.png";

const Step3 = () => {
  const dispatch = useDispatch();

  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  const postSodeUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(postSodeUrl);

  const searchAddress = () => {
    open({ onComplete: completeAddreses });
  };

  const completeAddreses = (data) => {
    // 우편번호 저장
    setZipCode(data.zonecode);
    // 주소 저장
    setAddress(data.roadAddress);
  };

  const clickSignup = () => {};

  return (
    <div className={`${style.step3Container}`}>
      <img src={progressIcon} className={`${style.progressImg}`} />
      <div className={`${style.inputContainer}`}>
        <img src={icon1} />
        <input
          className={`${style.addressInput}`}
          value={zipCode}
          placeholder="우편번호"
          disabled
        />
        <button onClick={searchAddress}>검색</button>
      </div>

      <div className={`${style.inputContainer}`}>
        <img src={icon2} />
        <input placeholder="주소" value={address} disabled />
      </div>

      <img src={line} className={`${style.line}`} />

      <button
        className={`${style.nextButton}`}
        style={{ backgroundColor: "#EEB233", color: "#1C1C1C" }}
        onClick={clickSignup}
      >
        가입하기
      </button>

      {/* {(checkNickname && checkPw) || (
        <button
          className={`${style.nextButton}`}
          style={{
            backgroundColor: "#B6B6B6",
            color: "#5A5A5A",
            cursor: "not-allowed",
          }}
        >
          가입하기
        </button>
      )} */}
    </div>
  );
};

export default Step3;
