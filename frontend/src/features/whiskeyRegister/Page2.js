import { useDispatch } from "react-redux";
import { registerAction } from "../../store/slices/register";

import DetectionResult from "./DetectionResult";

const Page2 = () => {
  const dispatch = useDispatch();

  const beforeClickHandler = () => {
    dispatch(registerAction.pageOne());
  };

  const nextClickHandler = () => {
    dispatch(registerAction.pageThree());
  };

  return (
    <div>
      <h1>2</h1>
      <DetectionResult />
      <button onClick={beforeClickHandler}>이전 페이지</button>
      <button onClick={nextClickHandler}>다음 페이지</button>
    </div>
  );
};

export default Page2;
