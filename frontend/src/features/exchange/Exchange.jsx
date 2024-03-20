import ExchangeSorter from "../exchange/ExchangeSorter";
import ExchangeMap from "../exchange/ExchangeMap";
import style from "./Exchange.module.css";

function Exchange() {
  return (
    <>
      <h1>Exchange</h1>
      <ExchangeSorter />
      <ExchangeMap />
    </>
  );
}
export default Exchange;
