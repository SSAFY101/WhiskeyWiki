import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../store/slices/register";

import ImgUpload from "./ImgUpload";
import DetectionResult from "./DetectionResult";
import RegisterResult from "./RegisterResult";

const WhiskeyRegister = () => {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.register.page);

  useEffect(() => {
    dispatch(registerAction.pageOne()); // 새로 고침/진입시 1페이지에서 시작
  }, []);

  return (
    <div>
      {page === 1 && <ImgUpload />}
      {page === 2 && <DetectionResult />}
      {page === 3 && <RegisterResult />}
    </div>
  );
};

export default WhiskeyRegister;
