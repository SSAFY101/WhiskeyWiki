import { useDispatch, useSelector } from "react-redux";

import { registerAction } from "../../store/slices/register";
import WhiskeyCard from "./WhiskeyCard";
import { useEffect } from "react";

const DetectionResult = () => {
  const dispatch = useDispatch();

  const whiskeyList = useSelector((state) => state.register.whiskeyList);

  const Test = [
    {
      name: "test1",
      abv: 30,
      price: 10000,
    },
    {
      name: "test2",
      abv: 35,
      price: 20000,
    },
    {
      name: "test3",
      abv: 40,
      price: 30000,
    },
  ];

  useEffect(() => {
    dispatch(registerAction.addNewWhiskey(Test));
  }, []);

  console.log(whiskeyList);

  return (
    <div>
      <div style={{ display: "flex" }}>
        {Test.map((whiskey) => (
          <WhiskeyCard key={whiskey.name} {...whiskey} />
        ))}
      </div>
    </div>
  );
};

export default DetectionResult;
