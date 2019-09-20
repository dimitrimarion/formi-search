import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import logo from "../assets/img/logotext.png";

const Search = () => {
  const URL = "https://api.gbif.org/v1";

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch(`${URL}/enumeration/country`)
      .then(response => response.json())
      .then(data => {
        setCountries(
          data.map(({ iso2, title }) => ({
            iso2,
            title
          }))
        );
      });
  }, []);

  const [country, setCountry] = useState({ isoCode: "", name: "" });
  useEffect(() => {
    if (countries.length != 0 && country.name != "") {
      const countryObj = countries.find(el => el.title === country.name);
      country.isoCode = countryObj ? countryObj.iso2 : "";
    }
  }, [country.isoCode, country.name, countries]);

  const [resultsSpecies, setResultsSpecies] = useState([]);
  const [species, setSpecies] = useState([]);

  const requestSpecies = () => {
    fetch(
      `${URL}/occurrence/search/?datasetKey=13b70480-bd69-11dd-b15f-b8a03c50a862&familyKey=4342&limit=50&country=HU`
    )
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        const { results } = data;
        setSpecies(extractData(results));
        //console.log(species);

        //navigate("/results", { state: { species: species } });
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
            navigate("/results", { state: { country: country.isoCode } });
          }}
        >
          <datalist id="country">
            <option></option>
            {countries.map(({ title }) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </datalist>

          <input
            list="country"
            id="country"
            value={country.name}
            placeholder="Select a country"
            onChange={e => {
              setCountry({ name: e.target.value });
            }}
          />

          <button>Submit</button>
        </form>
      </section>
    </main>
  );
};

export default Search;
