import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>Home</div>
      <Link to="/chat">채팅 리스트 (테스트)</Link>
    </div>
  );
};

export default Home;
