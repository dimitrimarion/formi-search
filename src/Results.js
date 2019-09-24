import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { navigate } from "@reach/router";
import Ants from "./Ants";

const Results = props => {
  const LIMIT = 16;
  const GBIF_API =
    "https://api.gbif.org/v1/occurrence/search/?datasetKey=13b70480-bd69-11dd-b15f-b8a03c50a862&familyKey=4342";

  const [activepage, setActivepage] = useState(0);
  useEffect(() => {
    setActivepage(props.pageId);
  }, [props.pageId]);

  const [offset, setOffset] = useState((props.pageId - 1) * LIMIT);
  useEffect(() => {
    setOffset((props.pageId - 1) * LIMIT);
  }, [props.pageId]);

  const [speciesSearch, setSpeciesSearch] = useState("");
  useEffect(() => {
    setSpeciesSearch(props.speciesName === "all" ? "" : props.speciesName);
  }, [props.speciesName]);

  const [url] = useState(GBIF_API);
  const [species, setSpecies] = useState([]);
  const [speciCount, setSpeciCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setLoading(true);

      try {
        const response = await fetch(
          props.speciesName == "all"
            ? `${url}&limit=${LIMIT}&offset=${offset}&country=${props.country}`
            : `${url}&limit=${LIMIT}&offset=${offset}&country=${props.country}&scientificName=${props.speciesName}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        const { results } = data;
        const { count } = data;

        setSpecies(results);
        setSpeciCount(results.length == 0 ? 0 : count);
        setLoading(false);
      } catch (error) {
        setIsError(true);
      }

      setLoading(false);
    };
    fetchData();
  }, [url, props.country, props.speciesName, offset]);

  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    setPageCount(Math.ceil(speciCount / LIMIT));
  }, [setSpeciCount, speciCount]);

  return (
    <Fragment>
      {isError && <h1 className="title">Something went wrong ...</h1>}

      {loading ? (
        <h1 className="title">Loading ...</h1>
      ) : (
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
                  setActivepage(selected + 1);
                  navigate(
                    `/results/${props.country}/${
                      props.speciesName
                    }/page/${selected + 1}`,
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
      )}
    </Fragment>
  );
};

export default Results;
