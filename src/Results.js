import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { navigate } from "@reach/router";
import Ants from "./Ants";

const Results = props => {
  const LIMIT = 16;
  const GBIF_API =
    "https://api.gbif.org/v1/occurrence/search/?datasetKey=13b70480-bd69-11dd-b15f-b8a03c50a862&familyKey=4342";

  const [activepage, setActivepage] = useState(0);
  useEffect(() => {
    console.log(props.pageId);
    setActivepage(props.pageId);
  }, [props.pageId]);

  const [offset, setOffset] = useState((props.pageId - 1) * LIMIT);
  useEffect(() => {
    console.log("setOffset");
    setOffset((props.pageId - 1) * LIMIT);
  }, [props.pageId]);

  const [speciesSearch, setSpeciesSearch] = useState("");
  useEffect(() => {
    setSpeciesSearch(props.speciesName === "all" ? "" : props.speciesName);
  }, [props.speciesName]);

  const [url, setUrl] = useState(GBIF_API);
  /*  useEffect(() => {
    setUrl(
      `${GBIF_API}`
    );
  }, [offset, props.country, props.speciesName]); */

  const [species, setSpecies] = useState([]);
  const [speciCount, setSpeciCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      props.speciesName == "all"
        ? `${url}&limit=${LIMIT}&offset=${offset}&country=${props.country}`
        : `${url}&limit=${LIMIT}&offset=${offset}&country=${props.country}&scientificName=${props.speciesName}`
    )
      .then(response => response.json())
      .then(data => {
        console.log("useEffect Species");
        console.log(data);
        console.log("*** URL:" + url);
        const { results } = data;
        const { count } = data;
        console.log(results);

        setSpecies(results);
        setSpeciCount(results.length == 0 ? 0 : count);
        setLoading(false);
      });
    return () => {
      console.log("cleanup");
      setLoading(true);
    };
  }, [url, props.country, props.speciesName, offset]);

  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    console.log("useEffect pageCount");
    setPageCount(Math.ceil(speciCount / LIMIT));
  }, [setSpeciCount, speciCount]);

  if (loading) {
    return <h1>Loading ...</h1>;
  } else {
    return (
      <div>
        <main className="ant-page">
          <h1 className="title">
            {speciCount} specimens in {props.location.state.country.name}.
          </h1>
          <form
            className="species-form"
            onSubmit={e => {
              e.preventDefault();
              navigate(`/results/${props.country}/${speciesSearch}/page/1`, {
                state: { country: props.location.state.country }
              });
              /* setUrl(
                `${GBIF_API}&limit=${LIMIT}&offset=${offset}&country=${props.country}&scientificName=${speciesSearch}`
              ); */
            }}
          >
            <input
              id="species"
              value={speciesSearch}
              placeholder="Filter by species name"
              onChange={e => setSpeciesSearch(e.target.value)}
            />
            <button>Submit</button>
          </form>
          <Ants species={species} />
          <nav className="nav-pagination">
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              containerClassName="pagination"
              previousLabel="&laquo;"
              nextLabel="&raquo;"
              activeClassName="active-page"
              onPageChange={({ selected }) => {
                console.log("selected " + selected);
                setActivepage(selected + 1);
                navigate(
                  `/results/${props.country}/${speciesSearch}/page/${selected +
                    1}`,
                  {
                    state: { country: props.location.state.country }
                  }
                );
              }}
              forcePage={activepage - 1}
            />
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
