import React from "react";
import antImg from "../assets/img/ant.svg";
import AntCard from "./AntCard";

const Ants = ({ species }) => {
  const filterMedia = media => {
    const mediaHead = media.filter(item => item.identifier.includes("h_1"));
    return mediaHead.length != 0
      ? mediaHead[0].identifier.replace("high", "thumbview")
      : antImg;
  };
  return (
    <section className="ant-result">
      {species.map(({ key, species, scientificName, country, media }) => (
        <AntCard
          key={key}
          species={species}
          scientificName={scientificName}
          country={country}
          media={media ? filterMedia(media) : antImg}
        />
      ))}
    </section>
  );
};

export default Ants;
