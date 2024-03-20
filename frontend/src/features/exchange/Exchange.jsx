import ExchangeSorter from "../exchange/ExchangeSorter";
import ExchangeMap from "../exchange/ExchangeMap";
import style from "./Exchange.module.css";

function Exchange() {
  return (
    <>
      <h1>Exchange</h1>
      <div className="container">
        <div>
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
