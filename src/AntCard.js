import React from "react";

const AntCard = ({ key, species, scientificName, country, media }) => {
  return (
    <div className="ant-card" key={key}>
      <img src={media} alt={species} />
      <div className="ant-description">
        <p className="ant-name">{species ? species : scientificName}</p>
        <p className="country">{country}</p>
      </div>
    </div>
  );
};

export default AntCard;
