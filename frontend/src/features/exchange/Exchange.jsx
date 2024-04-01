import ExchangeSorter from "../exchange/ExchangeSorter";
import ExchangeMap from "../exchange/ExchangeMap";
import { useSelector } from "react-redux";
import style from "./Exchange.module.css";

function Exchange() {
  // Redux 활용 => otherbarCount 를 받아오기
  const otherbarCount = useSelector((state) => state.exchange.otherbarCount);

  console.log(otherbarCount);
  return (
    <div className={style.container}>
      <div className={style.head}>
        <h1>
          <span className={style.highlight}>{otherbarCount}</span> 개의 마이바를
          찾았습니다
        </h1>
      </div>
      <div className={style.sorterandmap}>
        <div className={style.sorter}>
          <ExchangeSorter />
        </div>
        <div className={style.map}>
          <ExchangeMap />
        </div>
      </div>
    </div>
  );
}
export default Exchange;
