import ExchangeSorter from "../exchange/ExchangeSorter";
import ExchangeMap from "../exchange/ExchangeMap";
import style from "./Exchange.module.css";

function Exchange() {
  return (
    <>
      <div className={`${style.head}`}>
        <h1>N개의 마이바를 찾았습니다</h1>
      </div>
      <div className={`${style.container}`}>
        <div className={`${style.sorter}`}>
          <ExchangeSorter />
        </div>
        <div>
          <ExchangeMap />
        </div>
      </div>
    </>
  );
}
export default Exchange;
