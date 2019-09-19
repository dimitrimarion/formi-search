import React, { useState, useEffect } from "react";
import logo from "../assets/img/logotext.png";

const Search = () => {
  const URL =
    "https://api.gbif.org/v1/occurrence/search/?datasetKey=13b70480-bd69-11dd-b15f-b8a03c50a862&familyKey=4342&limit=50&country=";
  const [country, setCountry] = useState("");
  const [species, setSpecies] = useState([]);

  const requestSpecies = () => {
    fetch(`${URL}HU`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const { results } = data;

        setSpecies(extractData(results));
      });
  };

  const extractData = results => {
    const antsData = results.map(({ key, scientificName, media }) => ({
      key,
      scientificName,
      media
    }));

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

    return uniqueSpecies;
  };

  useEffect(() => {
    setCountry("");
    setSpecies([]);
  }, []);

  return (
    <main>
      <section className="hero">
        <img src={logo} alt="logo" />
        <p>Enter a country to find the ants species.</p>
      </section>

      <section className="search">
        <form
          onSubmit={e => {
            e.preventDefault();
            requestSpecies();
          }}
        >
          <input
            type="text"
            id="country"
            value={country}
            placeholder="Country"
            onChange={e => setCountry(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </section>
    </main>
  );
};

export default Search;
