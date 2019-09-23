import React, { useEffect, useState } from "react";
import antImg from "../assets/img/ant.svg";
import { navigate } from "@reach/router";
import Ants from "./Ants";

const Results = props => {
  const LIMIT = 16;

  const [activepage, setActivepage] = useState(1);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    console.log("setOffset");
    setOffset((props.pageId - 1) * LIMIT);
  }, [props.pageId, activepage]);

  const URL = `https://api.gbif.org/v1/occurrence/search/?datasetKey=13b70480-bd69-11dd-b15f-b8a03c50a862&familyKey=4342&limit=${LIMIT}&offset=${offset}&country=`;

  const [species, setSpecies] = useState([]);
  const [speciCount, setSpeciCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetch(`${URL}${props.country}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const { results } = data;
        const { count } = data;
        console.log(results);

        setSpecies(results);
        setSpeciCount(count);
        setPageCount(Math.ceil(count / LIMIT));
        setLoading(false);
      });
  }, [URL, props.country, activepage]);

  const filterMedia = media => {
    const mediaHead = media.filter(item => item.identifier.includes("h_1"));
    return mediaHead.length != 0
      ? mediaHead[0].identifier.replace("high", "thumbview")
      : antImg;
  };

  if (loading) {
    return <h1>Loading ...</h1>;
  } else {
    return (
      <div>
        <main className="ant-page">
          <h1>
            {speciCount} specimens in {props.location.state.country.name}.
          </h1>
          <Ants species={species} />
          <nav>
            {speciCount < LIMIT ? (
              ""
            ) : (
              <ul className="pagination">
                <li>
                  <button>{offset / LIMIT + 1}</button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivepage(2);
                      navigate(`/results/${props.country}/page/2`);
                    }}
                  >
                    {offset / LIMIT + 2}
                  </button>
                </li>
                <li>
                  <button>{offset / LIMIT + 3}</button>
                </li>
              </ul>
            )}
          </nav>
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
  }
};

export default Results;
