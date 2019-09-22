import React, { useEffect, useState } from "react";
import antImg from "../assets/img/ant.svg";

const Results = props => {
  const URL =
    "https://api.gbif.org/v1/occurrence/search/?datasetKey=13b70480-bd69-11dd-b15f-b8a03c50a862&familyKey=4342&limit=16&offset=0&country=";
  const [species, setSpecies] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`${URL}${props.location.state.country.isoCode}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const { results } = data;
        const { count } = data;
        console.log(results);
        setSpecies(results);
        setCount(count);
      });
  }, [props.location.state.country]);

  const filterMedia = media => {
    const mediaHead = media.filter(item => item.identifier.includes("h_1"));
    return mediaHead.length != 0
      ? mediaHead[0].identifier.replace("high", "thumbview")
      : antImg;
  };

  return (
    <div>
      <main className="ant-page">
        <h1>
          {count} specimens in {props.location.state.country.name}.
        </h1>
        <section className="ant-result">
          {species.map(({ key, species, scientificName, country, media }) => (
            <div className="ant-card" key={key}>
              <img src={media ? filterMedia(media) : antImg} alt={species} />
              <div className="ant-description">
                <p className="ant-name">{species ? species : scientificName}</p>
                <p className="country">{country}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className="result-footer">
        <p>
          Images from{" "}
          <a className="link" href="https://www.antweb.org">
            AntWeb
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Results;
