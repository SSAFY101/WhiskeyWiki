import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../../store/slices/signup";
import { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";

import style from "../css/Signup.module.css";

import progressIcon from "../images/step3.png";
import icon1 from "../images/step3_1.png";
import icon2 from "../images/step3_2.png";
import line from "../images/line.png";
import warningIcon from "../images/warning.png";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.signup.user);

  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  const [checkZipCode, setCheckZipCode] = useState(false);
  const [checkAddress, setCheckAddress] = useState(false);

  const postSodeUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(postSodeUrl);

  const searchAddress = () => {
    open({ onComplete: completeAddreses });
  };

  // 조건 체크
  useEffect(() => {
    if (zipCode.length > 0) {
      setCheckZipCode(true);
    } else {
      setCheckZipCode(false);
    }
  }, [zipCode]);

  useEffect(() => {
    if (address.length > 0) {
      setCheckAddress(true);
    } else {
      setCheckAddress(false);
    }
  }, [address]);

  // 주소 저장
  const completeAddreses = (data) => {
    // 우편번호 저장
    setZipCode(data.zonecode);
    // 주소 저장
    setAddress(data.roadAddress);
  };

  const clickSignup = () => {
    dispatch(signupAction.stepThree(address));
    signUp();
  };

  const signUp = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/users/register", user)
      .then((res) => {
        console.log("회원가입", res);
        alert("회원가입이 완료되었습니다."); // 페이지 따로 만들면 좋을듯
        navigate("/");
      })
      .catch((err) => {
        console.log("회원가입 실패", err);
      });
  };

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

      {checkZipCode && checkAddress && (
        <button
          className={`${style.nextButton}`}
          style={{ backgroundColor: "#EEB233", color: "#1C1C1C" }}
          onClick={clickSignup}
        >
          가입하기
        </button>
      )}

      {(checkZipCode && checkAddress) || (
        <button
          className={`${style.nextButton}`}
          style={{
            backgroundColor: "#B6B6B6",
            color: "#5A5A5A",
            cursor: "not-allowed",
          }}
          disabled
        >
          가입하기
        </button>
      )}
    </div>
  );
};

export default Step3;
