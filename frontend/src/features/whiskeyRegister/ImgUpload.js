import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../store/slices/register";
import imageCompression from "browser-image-compression";
import axios from "axios";

const ImgUpload = () => {
  const dispatch = useDispatch();

  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    console.log(img);
  }, [img]);

  const imgInputClickHandler = async (e) => {
    const input = e.target.files[0];

    console.log(input);

    try {
      const compressedImage = await imageCompression(input, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 416,
      });
      const previewUrl = URL.createObjectURL(compressedImage);
      setPreview(previewUrl);
      setImg(compressedImage);
    } catch (error) {
      console.error("이미지 리사이징 실패 :", error);
    }
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("file", img);

    const 테스트 = ["Absolut", "Jack-Daniels", "Jim-Beam"];
    dispatch(registerAction.addNewWhiskey(테스트));

    // axios
    //   .post(`http://localhost:8000/detection/`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log("res : ", res);
    //     // 받은 배열 -> 칵테일 이름 배열 -> 리덕스
    //     // const cocktailNameList = res.data;
    //     // dispatch(registerAction.addNewWhiskey(cocktailNameList));
    //   })
    //   .catch((err) => {
    //     console.log("err : ", err);
    //   });
  };

  return (
    <div>
      <input type="file" accept=".jpg, .png" onChange={imgInputClickHandler} />
      <div style={{ display: "flex" }}>
        <div>
          <img src={preview} style={{ width: "20rem" }} />
        </div>
        <div>화 살 표</div>
        <div>
          <img src={preview} style={{ width: "20rem" }} />
        </div>
      </div>
      <button onClick={submitHandler}>AI 테스트</button>
    </div>
  );
};

export default ImgUpload;
