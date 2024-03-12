import { useSelector, useDispatch } from "react-redux";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

const WhiskeyRegister = () => {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.register.page);

  return (
    <div>
      {page === 1 && <Page1 />}
      {page === 2 && <Page2 />}
      {page === 3 && <Page3 />}
    </div>
  );
};

export default WhiskeyRegister;
