import { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import MyBarCheckEmpty from "./MyBarCheckEmpty";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./MyBarDetail.module.css";

function MyBarDetail({ whiskeyId, whiskeyNameKr, whiskeyNameEn, isOwner }) {
  // 모달 제어 - 3. 빈 병 표시하기
  const [isCheckEmptyModalOpen, setIsCheckEmptyModalOpen] = useState(false);
  const handleCloseCheckEmptyModal = () => {
    setIsCheckEmptyModalOpen(false);
    window.location.reload(); // 모달을 닫으면 페이지를 새로고침
  };

  // 빈 병 표시하기 (모달)
  const checkWhiskeyEmpty = () => {
    setIsCheckEmptyModalOpen(true);
  };

  // 위스키 이미지 불러오기
  const imgUrl = {
    imgUrl: require(`../../assets/images/whiskey/${whiskeyNameEn}.png`),
  };

  // 위스키 기본정보 가져오기
  const [whiskeyDetail, setWhiskeyDetail] = useState(null);
  useEffect(() => {
    const fetchWhiskeyDetail = async () => {
      try {
        const response = await axios.get(`/api/whiskey/info/${whiskeyId}`);
        // console.log(response.data.data);
        setWhiskeyDetail(response.data.data);
      } catch (error) {
        console.error("위스키 상세 정보 가져오기 실패", error);
      }
    };
    fetchWhiskeyDetail();
  }, []);

  return (
    <>
      {/* 위스키 상세정보 내용 */}
      <p className={style.whiskeyNameKr}>{whiskeyNameKr}</p>
      <h4>{whiskeyNameEn}</h4>

      <div className={style.preview}>
        <img src={imgUrl.imgUrl} alt="" className={style.whiskeyImage} />
        <div className={style.detail}>
          {whiskeyDetail ? <p>{whiskeyDetail.detail}</p> : <div>Loding...</div>}
        </div>
      </div>

      <div>
        {/* 위스키별 상세페이지로 이동 */}
        <Link to={`/whiskeyDetail/${whiskeyId}`} className={style.button}>
          상세 정보 보기
        </Link>

        {/* 위스키별 빈 병 표시하기 */}
        {isOwner && ( // isOwner가 true일 때에만 버튼 렌더링
          <button className={style.button} onClick={checkWhiskeyEmpty}>
            빈 병 전환하기
          </button>
        )}
      </div>

      {/* 조건부 렌더링 */}
      {isCheckEmptyModalOpen && (
        <Modal
          isOpen={isCheckEmptyModalOpen}
          onClose={handleCloseCheckEmptyModal}
        >
          <MyBarCheckEmpty
            whiskeyId={whiskeyId}
            whiskeyNameKr={whiskeyNameKr}
            whiskeyNameEn={whiskeyNameEn}
            handleCloseCheckEmptyModal={handleCloseCheckEmptyModal}
          />
        </Modal>
      )}
    </>
  );
}

export default MyBarDetail;
