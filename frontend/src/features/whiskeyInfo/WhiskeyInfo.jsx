import SearchBar from "../../widgets/Searchbar";
import Infocard from "./InfoCard";
import WhiskeySorter from "./WhiskeySorter";
import style from "./WhiskeyInfo.module.css";

// import { }
function WhiskeyInfo() {
  return (
    <div>
      <h1>위스키 목록</h1>
      <SearchBar />
      <div>
        <WhiskeySorter />
        <div className={style.cardContainer}>
          <Infocard></Infocard>
        </div>
      </div>
    </div>
  );
}
export default WhiskeyInfo;
