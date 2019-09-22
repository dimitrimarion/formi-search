import React, { useEffect, useState } from "react";

const Results = props => {
  const URL =
    "https://api.gbif.org/v1/occurrence/search/?datasetKey=13b70480-bd69-11dd-b15f-b8a03c50a862&familyKey=4342&limit=50&country=";
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetch(`${URL}${props.location.state.country}`)
      .then(response => response.json())
      .then(data => {
        const { results } = data;
        console.log(results);
        setSpecies(results);
      });
  }, [props.location.state.country]);

  const filterMedia = media => {
    const mediaHead = media.filter(item => item.identifier.includes("h_1"));
    return mediaHead.length != 0
      ? mediaHead[0].identifier.replace("high", "thumbview")
      : "";
  };

  return (
    <main className="ant-page">
      <section className="ant-result">
        {species.map(({ key, scientificName, country, media }) => (
          <div className="ant-card" key={key}>
            <img src={media ? filterMedia(media) : ""} alt={scientificName} />
            <div className="ant-description">
              <p className="ant-name">{scientificName}</p>
              <p>{country}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Results;
