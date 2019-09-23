import React, { useEffect, useState } from "react";

const Details = props => {
  const [gbifUrl, setGbifUrl] = useState("");
  useEffect(() => {
    setGbifUrl(`https://www.gbif.org/occurrence/${props.location.state.id}`);
  }, [props.location.state.id]);

  const [antwebUrl, setAntwebUrl] = useState("");
  useEffect(() => {
    setAntwebUrl(
      `https://www.antweb.org/specimen/${props.location.state.catalogNumber}`
    );
  }, [props.location.state.catalogNumber]);

  return (
    <main>
      <h1 className="title">{props.location.state.scientificName}</h1>
      <ul className="detailsList">
        <li>
          <span className="list-bold">Country</span>:{" "}
          {props.location.state.country}
        </li>
        <li>
          <span className="list-bold">GBIF</span>:{" "}
          <a href={gbifUrl}>{gbifUrl}</a>
        </li>
        <li>
          <span className="list-bold">AntWeb</span>:{" "}
          <a href={antwebUrl}>{antwebUrl}</a>
        </li>
      </ul>
    </main>
  );
};

export default Details;
