import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../../store/slices/signup";
import axios from "axios";

import style from "../css/Signup.module.css";

import progressIcon from "../images/step1.png";
import icon1 from "../images/step1_1.png";
import icon2 from "../images/step1_2.png";
import icon3 from "../images/step1_3.png";
import line from "../images/line.png";
import warningIcon from "../images/warning.png";

const Step1 = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");

  const [checkId, setCheckId] = useState(false);
  const [checkPw, setCheckPw] = useState(false);
  const [checkPwSame, setCheckPwSame] = useState(false);

  const regex = /[^a-zA-Z0-9]+$/;

  // 입력
  const changeUserId = (e) => {
    const value = e.target.value.replace(regex, "");
    console.log(value);
    setUserId(value);
  };
  const changePassword = (e) => {
    setUserPassword(e.target.value);
  };
  const changePasswordCheck = (e) => {
    setUserPasswordCheck(e.target.value);
  };

  // 조건
  const checkValid = () => {
    // 아이디 중복 검사
    axios
      .post("/api/users/valid/id", {
        loginId: userId,
      })
      .then((res) => {
        console.log("아이디 중복 검사", res);
      })
      .catch((err) => {
        console.log("아이디 중복 검사 실패", err);
      });
  };

  useEffect(() => {
    if (userId.length > 3) {
      // 아이디 중복 체크 api 필요
      axios
        .get(process.env.REACT_APP_API_URL + "/users/valid/" + userId)
        .then((res) => {
          const isValid = res.data.data;
          if (isValid) {
            setCheckId(true);
          } else {
            setCheckId(false);
          }
        })
        .catch((err) => {
          console.log("아이디 중복 검사 실패", err);
        });
    } else {
      setCheckId(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userPassword.length >= 6) {
      setCheckPw(true);
    } else {
      setCheckPw(false);
    }
  }, [userPassword]);

  useEffect(() => {
    if (userPasswordCheck.length >= 6 && userPassword === userPasswordCheck) {
      setCheckPwSame(true);
    } else {
      setCheckPwSame(false);
    }
  }, [userPasswordCheck]);

  // 다음으로 버튼 클릭
  const clickNextButton = () => {
    dispatch(signupAction.stepOne(userId, userPassword));
    dispatch(signupAction.pageTwo());
  };

  return (
    <div className={`${style.step1Container}`}>
      <img src={progressIcon} className={`${style.progressImg}`} />
      {/* 아이디 */}
      <div className={`${style.inputContainer}`}>
        <img src={icon1} />
        <input
          placeholder="아이디"
          value={userId}
          onChange={changeUserId}
          spellCheck="false"
          maxLength="12"
          onBlur={checkValid}
          style={{
            border:
              userId.length === 0
                ? ""
                : checkId
                ? "solid 2px #28B280"
                : "solid 2px #FF3D3D",
          }}
        />
        <img
          src={warningIcon}
          style={{
            visibility:
              userId.length === 0 ? "hidden" : checkId ? "hidden" : "",
          }}
        />
      </div>

      {/* 비밀번호 */}
      <div className={`${style.inputContainer}`}>
        <img src={icon2} />
        <input
          placeholder="비밀번호"
          type="password"
          value={userPassword}
          onChange={changePassword}
          maxLength="16"
          style={{
            border:
              userPassword.length === 0
                ? ""
                : checkPw
                ? "solid 2px #28B280"
                : "solid 2px #FF3D3D",
          }}
        />
        <img
          src={warningIcon}
          style={{
            visibility:
              userPassword.length === 0 ? "hidden" : checkPw ? "hidden" : "",
          }}
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className={`${style.inputContainer}`}>
        <img src={icon3} />
        <input
          placeholder="비밀번호 확인"
          type="password"
          value={userPasswordCheck}
          onChange={changePasswordCheck}
          maxLength="16"
          style={{
            border:
              userPasswordCheck.length === 0
                ? ""
                : checkPwSame
                ? "solid 2px #28B280"
                : "solid 2px #FF3D3D",
          }}
        />
        <img
          src={warningIcon}
          style={{
            visibility:
              userPasswordCheck.length === 0
                ? "hidden"
                : checkPwSame
                ? "hidden"
                : "",
          }}
        />
      </div>
      <img src={line} className={`${style.line}`} />
      {checkId && checkPw && checkPwSame && (
        <button
          className={`${style.nextButton}`}
          style={{ backgroundColor: "#EEB233", color: "#1C1C1C" }}
          onClick={clickNextButton}
        >
          다음으로
        </button>
      )}
      {(checkId && checkPw && checkPwSame) || (
        <button
          className={`${style.nextButton}`}
          style={{
            backgroundColor: "#B6B6B6",
            color: "#5A5A5A",
            cursor: "not-allowed",
          }}
          disabled
        >
          다음으로
        </button>
      )}
    </div>
  );
};

export default Step1;
