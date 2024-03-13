import { WhiskeyImages } from "../images/WhiskeyImages";

const RegistResCard = ({ nameEn }) => {
  const Whiskey = WhiskeyImages.find((it) => it.nameEn === nameEn);

  // console.log(Whiskey);

  const imgUrl = Whiskey.imgUrl;
  return (
    <div>
      <div>
        <img src={imgUrl} style={{ width: "10rem" }} />
      </div>
      <div>{nameEn}</div>
    </div>
  );
};

export default RegistResCard;
