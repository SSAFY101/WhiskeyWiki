import { useSelector } from "react-redux";

import ImgUpload from "./ImgUpload";
import DetectionResult from "./DetectionResult";
import RegisterResult from "./RegisterResult";

import style from "./css/index.module.css";

const WhiskeyRegister = () => {
  const page = useSelector((state) => state.register.page);

  return (
    <div className={`${style.container}`}>
      {page === 1 && <ImgUpload />}
      {page === 2 && <DetectionResult />}
      {page === 3 && <RegisterResult />}
    </div>
  );
};

export default WhiskeyRegister;
