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

        const antsData = results.map(
          ({ key, scientificName, media, country }) => ({
            key,
            scientificName,
            media,
            country
          })
        );

        console.log(antsData);

        // Remove results with same species name
        const uniqueSpecies = antsData.reduce((unique, item) => {
          if (!unique.length) {
            return [item];
          }
          const { scientificName: uniqueName } = unique[unique.length - 1];
          const { scientificName: itemName } = item;

          return uniqueName === itemName ? unique : [...unique, item];
        }, []);

        console.log(uniqueSpecies);
        setSpecies(uniqueSpecies);
      });
  }, [props.location.state.country]);

  return (
    <main className="ant-page">
      <p>Results page</p>
      <pre>
        <code></code>
      </pre>
    </main>
  );
};

export default Results;
