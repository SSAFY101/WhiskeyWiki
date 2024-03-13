import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import axios from "axios";

const ImgUpload = () => {
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

    axios
      .post(`http://localhost:8000/detection/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res : ", res);
      })
      .catch((err) => {
        console.log("err : ", err);
      });
  };

  return (
    <div>
      <input type="file" accept=".jpg, .png" onChange={imgInputClickHandler} />
      <div>
        <img src={preview} />
      </div>
      <button onClick={submitHandler}>전송</button>
    </div>
  );
};

export default ImgUpload;
