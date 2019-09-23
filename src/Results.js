import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { navigate } from "@reach/router";
import Ants from "./Ants";

const Results = props => {
  const LIMIT = 16;

  const [activepage, setActivepage] = useState(1);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    console.log("setOffset");
    setOffset((props.pageId - 1) * LIMIT);
  }, [props.pageId]);

  const URL = `https://api.gbif.org/v1/occurrence/search/?datasetKey=13b70480-bd69-11dd-b15f-b8a03c50a862&familyKey=4342&limit=${LIMIT}&offset=${offset}&country=`;

  const [species, setSpecies] = useState([]);
  const [speciCount, setSpeciCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${URL}${props.country}`)
      .then(response => response.json())
      .then(data => {
        console.log("useEffect Species");
        console.log(data);
        const { results } = data;
        const { count } = data;
        console.log(results);

        setSpecies(results);
        setSpeciCount(count);
        setLoading(false);
      });
    return () => {
      console.log("cleanup");
      setLoading(true);
    };
  }, [URL, props.country]);

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
          <h1>
            {speciCount} specimens in {props.location.state.country.name}.
          </h1>
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
                navigate(`/results/${props.country}/page/${selected + 1}`, {
                  state: { country: props.location.state.country }
                });
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
