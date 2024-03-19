import {Route, useNavigate} from 'react-router-dom'
import SearchBar from "../../widgets/Searchbar";
import Infocard from "./InfoCard";
import WhiskeySorter from "./WhiskeySorter";
import style from "./WhiskeyInfo.module.css";

function WhiskeyInfo() {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate('/whiskeyDetail')
  }
  return (
    <div>
      <h1>위스키 목록</h1>
      <SearchBar />
      <div>
        <WhiskeySorter/>
        <div className={style.cardContainer}>
          <Infocard onClick={goToDetail} />
        </div>
      </div>
    </div>
  );
}
export default WhiskeyInfo;
