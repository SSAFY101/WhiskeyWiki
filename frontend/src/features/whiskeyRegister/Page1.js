import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../store/slices/register";

import ImgUpload from "./ImgUpload";

const Page1 = () => {
  const dispatch = useDispatch();

  const nextClickHandler = () => {
    dispatch(registerAction.pageTwo());
  };

  return (
    <div>
      <h1>
        1
        <ImgUpload />
        <button onClick={nextClickHandler}>다음 페이지</button>
      </h1>
    </div>
  );
};

export default Page1;
