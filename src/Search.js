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

  return (
    <main>
      <section className="hero">
        <img src={logo} alt="logo" />
        <p>Search ants species by country (GBIF AntWeb dataset)</p>
      </section>

      <section className="search">
        <form
          onSubmit={e => {
            e.preventDefault();
            navigate("/results", {
              state: { country: country }
            });
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
