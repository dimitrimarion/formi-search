import React from "react";
import { Link } from "@reach/router";

const AntCard = ({
  key,
  id,
  species,
  scientificName,
  country,
  media,
  catalogNumber
}) => {
  return (
    <Link
      to={`/details/${id}`}
      className="ant-card-link"
      state={{ scientificName, id, catalogNumber, country }}
    >
      <div className="ant-card" key={key}>
        <img src={media} alt={species} />
        <div className="ant-description">
          <p className="ant-name">{species ? species : scientificName}</p>
          <p className="country">{country}</p>
        </div>
      </div>
    </Link>
  );
};

export default AntCard;
