import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../store/slices/register";
import imageCompression from "browser-image-compression";
import axios from "axios";

import style from "./css/ImgUpload.module.css";

const ImgUpload = () => {
  const dispatch = useDispatch();

  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    console.log(img);
  }, [img]);

  // 파일 업로드 클릭
  const imgInput = useRef();

  const uploadClickHandler = () => {
    imgInput.current.click();
  };
  // 이미지 업로드
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

    const 테스트 = [
      "Absolut",
      "Jack-Daniels",
      "Jim-Beam",
      "Jagermeister",
      "Johnie-Walker",
    ];
    dispatch(registerAction.setWhiskeyList(테스트));

    // axios
    //   .post(`http://localhost:8000/detection/`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log("Object Detection : ", res);
    //     // 받은 배열 -> 칵테일 이름 배열 -> 리덕스

    //     const data = res.data.data;
    //     const whiskeyNameList = [];

    //     data.forEach((item) => {
    //       whiskeyNameList.push(item.class_name);
    //     });

    //     dispatch(registerAction.setWhiskeyList(whiskeyNameList));
    //   })
    //   .catch((err) => {
    //     console.log("Object Detection ERROR : ", err);
    //   });

    dispatch(registerAction.pageTwo());
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.top}`}>
        <div className={`${style.textContainer}`}>
          <div>이미지를 업로드해서</div>
          <div>위스키 이름을 알아보세요.</div>
        </div>

        {/* 업로드 */}
        <input
          type="file"
          accept=".jpg, .png"
          onChange={imgInputClickHandler}
          ref={imgInput}
          style={{ display: "none" }}
        />

        {/* 업로드 라벨 */}
        {!preview && (
          <label onClick={uploadClickHandler} className={`${style.imgUpload}`}>
            <div>이미지 업로드</div>
          </label>
        )}

        {/* 이미지 프리뷰 */}
        {preview && (
          <div onClick={uploadClickHandler} className={`${style.preview}`}>
            <img src={preview} />
          </div>
        )}
      </div>
      {/* 하단 버튼 */}
      {preview && (
        <button onClick={submitHandler} className={`${style.detectButton}`}>
          AI 인식하기
        </button>
      )}
    </div>
  );
};

export default ImgUpload;
