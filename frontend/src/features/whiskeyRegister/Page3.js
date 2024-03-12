import { useDispatch } from "react-redux";
import { registerAction } from "../../store/slices/register";

import RegisterResult from "./RegisterResult";

const Page3 = () => {
  const dispatch = useDispatch();

  const beforeClickHandler = () => {
    dispatch(registerAction.pageTwo());
  };

  return (
    <div>
      <h1>3</h1>
      <RegisterResult />
      <button onClick={beforeClickHandler}>이전 페이지</button>
    </div>
  );
};

export default Page3;
