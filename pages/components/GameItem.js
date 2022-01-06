import Image from "next/image";

export const GameItem = ({ details }) => {
  return (
    <div className="group relative shadow-xl ">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 transition-all group-hover:scale-105 lg:h-80 lg:aspect-none rounded-md">
        <Image
          src={`https:${details.LocalizedProperties[0].Images[0].Uri}`}
          alt="Front of men&#039;s Basic Tee in black."
          className="w-full h-full object-center object-cover lg:w-full lg:h-full rounded-md"
          layout="fill"
        />
      </div>
    </div>
  );
};
