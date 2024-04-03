import LoadingGif from "../images/Loading1.gif";

const Loading = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <img
        src={LoadingGif}
        style={{
          position: "fiexd",
          top: "40%",
          left: "40%",
          height: "20rem",
          width: "20rem",
        }}
      />
    </div>
  );
};

export default Loading;
