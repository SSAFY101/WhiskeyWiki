import { useState } from "react";
import style from "./css/UserInfo.module.css";
function UserInfo() {
  const [nickname, setNickname] = useState("헤에");
  const [password, setPassword] = useState("1234");
  const [isNicknameEditable, setIsNicknameEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  // 변경사항이 있으면 버튼에 불이 들어온다

  const userData = {
    nickName: "헤에",
    age: 25,
    gender: "female",
    birthDate: "1999-05-05",
    id: "heeeeh",
    password: "1234",
  };

  //닉네임 수정 핸들러
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  //패스워드 수정 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //닉네임 편집 토글
  const toggleNicknameEdit = () => {
    setIsNicknameEditable(!isNicknameEditable);
  };

  //패스워드 편집 토글
  const togglePasswordEdit = () => {
    setIsPasswordEditable(!isPasswordEditable);
  };

  return (
    <div className={style.outerContainer}>
      <p>프로필</p>
      <div className={style.innerContainer}>
        <div className={style.field}>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            disabled={!isNicknameEditable}
          ></input>
          <button onClick={toggleNicknameEdit} className={style.button}>
            {isNicknameEditable ? "저장" : "수정"}
          </button>
        </div>
        <div className={style.field}>
          <input type="text" value={userData.birthDate} disabled="true"></input>
        </div>
        <div className={style.field}>
          <input type="text" value={userData.gender} disabled="true"></input>
        </div>
      </div>
      <p>계정</p>
      <div className={style.innerContainer}>
        <div className={style.field}>
          <input type="text" value={userData.id} disabled="true"></input>
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
          <input type="text" value={"상세주소"} disabled="true"></input>
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
