import Image from "next/image";

const GameItem = ({ details }) => {
  return (
    <li className="games__item">
      <Image
        src={`https:${details.LocalizedProperties[0].Images[0].Uri}`}
        alt={details.LocalizedProperties[0].ProductTitle}
        layout="responsive"
        className="games__image"
        width={100}
        height={100}
      />
      <div className="games__overlay">
        <div className="games__name">
          {details.LocalizedProperties[0].ProductTitle}
        </div>
        <div className="games__rating">
          Average rating:{" "}
          {details.MarketProperties[0].UsageData[2].AverageRating} / 5
        </div>
      </div>
    </li>
  );
};

export default GameItem;
