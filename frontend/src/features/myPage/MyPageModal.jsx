import { useNavigate } from "react-router-dom";


function MyPageModal({onClose}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    onClose();
    navigate("/mypage");
  };
  return (
    <div onClick={handleNavigate} style={{ cursor: "pointer" }}>
      마이페이지
    </div>
  );
}
export default MyPageModal;
