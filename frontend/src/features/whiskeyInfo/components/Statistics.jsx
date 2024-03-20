import { ProgressBar } from "react-native-web";
import style from "./Statistics.module.css";
// 회색 SVG
import Twenties from "../../../assets/icon/Twenties.svg";
import Thirties from "../../../assets/icon/Thirties.svg";
import Forties from "../../../assets/icon/Forties.svg";
import Fifties from "../../../assets/icon/Fifties.svg";
// 컬러 SVG
import TwentiesColor from "../../../assets/icon/TwentiesColor.svg";
import ThirtiesColor from "../../../assets/icon/ThirtiesColor.svg";
import FortiesColor from "../../../assets/icon/FortiesColor.svg";
import FiftiesColor from "../../../assets/icon/FiftiesColor.svg";

function Statistics() {
  const data = [
    {
      svg: Twenties,
      colorSvg: TwentiesColor,
      progress: 0.51,
      color: "#48D287",
    },
    {
      svg: Thirties,
      colorSvg: ThirtiesColor,
      progress: 0.9,
      color: "#42CBDD",
    },
    { svg: Forties, colorSvg: FortiesColor, progress: 1, color: "#6765D6" },
    { svg: Fifties, colorSvg: FiftiesColor, progress: 0.8, color: "#B456E1" },
  ];

  const highestProgress = Math.max(...data.map((item) => item.progress));
  return (
    <div className={style.progressBarContainer}>
      {data.map((item, index) => (
        <div key={index} className={style.progressBarWrapper}>
          <img
            src={item.progress === highestProgress ? item.colorSvg : item.svg}
          />
          <ProgressBar
            progress={item.progress}
            style={{ height: 15, width: 100, borderRadius: 10 }}
            color={item.color}
            trackColor="grey"
          />
        </div>
      ))}
    </div>
  );
}
export default Statistics;
