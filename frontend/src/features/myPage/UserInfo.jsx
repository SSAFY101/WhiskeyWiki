import { useState, useEffect } from "react";
import style from "./css/UserInfo.module.css";
import instance from "../auth/axiosInterceptor";
function UserInfo() {
  const [nickname, setNickname] = useState(""); //닉네임 수정시 실시간으로 변경되는 UI 제공
  const [password, setPassword] = useState(""); //비밀번호 수정시 실시간으로 변경되는 UI 제공
  const [isNicknameEditable, setIsNicknameEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  // 변경사항이 있으면 버튼에 불이 들어온다
  const fetchUserInfo = async () => {
    try {
      const response = await instance.get(`api/users/info`);
      console.log(response.data.data);
      setUserInfo(response.data.data);
      // 닉네임 설정
      setNickname(response.data.data.nickname);
    } catch (error) {
      console.error("유저 정보 가져오기 오류", error);
    }
  };
  // 최초 페이지 로드시 유저 정보 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  //닉네임 수정 핸들러
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  //패스워드 수정 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //닉네임 편집 토글
  const toggleNicknameEditOrSave = () => {
    if (isNicknameEditable) {
      //저장 모드일 때
      handleNicknameSave(); //저장 로직 실행
    } else {
      //수정 모드로 전환
      setIsNicknameEditable(true);
      setNickname(userInfo.nickname);
    }
  };

  //비밀번호 저장
  const handlePasswordSave = async () => {
    if (isPasswordEditable && password) {
      //비밀번호가 비어있지 않으면
    }
    try {
      const response = await instance.post(
        `/api/users/edit/password/${password}`
      );
      console.log(response);
      // 비밀번호 업데이트 성공 후의 로직
      alert("비밀번호가 성공적으로 변경되었습니다."); // 예시로 alert 사용
      setIsPasswordEditable(false); // 수정 모드 종료
    } catch (error) {
      console.error("비밀번호 업데이트 오류", error);
      alert("비밀번호 변경 중 오류가 발생했습니다."); // 예시로 alert 사용
    }
  };
  //패스워드 편집 토글
  const togglePasswordEdit = () => {
    if (isPasswordEditable) {
      //저장 모드일 때
      handlePasswordSave();
    } else {
      //수정 모드로 변환
      setIsPasswordEditable(true);
    }
  };

  //닉네임 저장 핸들러
  const handleNicknameSave = async () => {
    // 닉네임이 수정되었다면
    if (isNicknameEditable && nickname !== userInfo.nickname) {
      try {
        const response = await instance.post(
          `/api/users/modify/nickname/${nickname}`
        );
        console.log(response);
        //성공적으로 업데이트 되었다면 UI를 업데이트
        setUserInfo((prevState) => ({ ...prevState, nickname: nickname }));
        //수정 모드 종료
        setIsNicknameEditable(false);
      } catch (error) {
        console.log("닉네임 업데이트 오류", error);
      }
    }
  };

  return (
    <div className={style.outerContainer}>
      <p>프로필</p>
      <div className={style.innerContainer}>
        <div className={style.field}>
          <input
            type="text"
            value={isNicknameEditable ? nickname : userInfo.nickname}
            onChange={handleNicknameChange}
            disabled={!isNicknameEditable}
          ></input>
          <button onClick={toggleNicknameEditOrSave} className={style.button}>
            {isNicknameEditable ? "저장" : "수정"}
          </button>
        </div>
        <div className={style.field}>
          <input type="text" value={userInfo.age} disabled="true"></input>
        </div>
        <div className={style.field}>
          <input type="text" value={userInfo.gender} disabled="true"></input>
        </div>
      </div>
      <p>계정</p>
      <div className={style.innerContainer}>
        <div className={style.field}>
          <input type="text" value={userInfo.loginId} disabled="true"></input>
        </div>
        <div className={style.field}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={!isPasswordEditable}
          ></input>
          <button onClick={togglePasswordEdit} className={style.button}>
            {isPasswordEditable ? "저장" : "수정"}
          </button>
        </div>
      </div>
      <p>주소</p>
      <div className={style.innerContainer}>
        <div className={style.field}>
          <input type="text" value={"주소"} disabled="true"></input>
        </div>
        <div className={style.field}>
          <input type="text" value={userInfo.address} disabled="true"></input>
          <button className={style.button}>
            {isPasswordEditable ? "저장" : "수정"}
          </button>
        </div>
      </div>
      <div className={style.withdrawalContainer}>
        <button className={style.withdrawal}>회원탈퇴</button>
      </div>
    </div>
  );
}
export default UserInfo;
