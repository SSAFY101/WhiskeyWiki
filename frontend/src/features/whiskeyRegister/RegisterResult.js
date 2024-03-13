import { useSelector } from "react-redux";

import RegistResCard from "./component/RegistResCard";

const RegisterResult = () => {
  const whiskeyList = useSelector((state) => state.register.whiskeyList);

  return (
    <div style={{ display: "flex" }}>
      {whiskeyList.map((whiskey) => (
        <div style={{ marginRight: "1rem" }}>
          <RegistResCard key={whiskey} nameEn={whiskey} />
        </div>
      ))}
    </div>
  );
};

export default RegisterResult;
