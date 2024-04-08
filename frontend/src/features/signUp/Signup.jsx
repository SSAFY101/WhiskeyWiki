import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupAction } from "../../store/slices/signup";

import style from "./css/Signup.module.css";
import whiskeyWiki from "../../assets/icon/whiskeyWiki.svg";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page = useSelector((state) => state.signup.page);

  useEffect(() => {
    dispatch(signupAction.pageOne());
  }, []);

  const renderStep = () => {
    switch (page) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
    }
  };

  const navigateBack = () => {
    navigate("/");
  };

  return (
    <div className={`${style.container}`}>
      {/* 로고 */}
      <div onClick={navigateBack} className={`${style.logo}`}>
        <Link to="/">
          <img src={whiskeyWiki} alt="" />
          Whiskey Wiki
        </Link>
      </div>
      {/* <div onClick={navigateBack} className={`${style.logo}`}>
        Whiskey Wiki
      </div> */}
      <div className={`${style.signupContainer}`}>
        <div className={`${style.title}`}>회원가입</div>
        {renderStep()}
      </div>
    </div>
  );
}
export default Signup;
