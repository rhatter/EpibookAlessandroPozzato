import React, { useState, useEffect } from "react";
import LatestRelease from "../components/LatestRelease/LatestRelease";
import localData from "../data/horror.json";
import MyNavBar from "../components/NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import CommentArea from "../components/CommentArea/CommentArea";
import fantasy from "../data/fantasy.json";
import "./Home.css";
import SearchBar from "../components/SearchBar/SearchBar";

function Home() {
  const [books, setBooks] = useState(fantasy);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setquery] = useState("");

  const asin = useSelector((state) => state.asin.value);

  async function fetchBooks() {
    try {
      setIsLoading(true);
      const res = await fetch("https://epibooks.onrender.com/");
      const data = await res.json();
      setIsLoading(false);
      setBooks(data);
    } catch (error) {
      setBooks(localData);
      setError(error);
    }
  }

  const renderLastRel = () => (
    <LatestRelease books={books} isLoading={isLoading} query={query} />
  );

  const renderError = () => <h2>Errore {error}</h2>;
  return (
    <>
      <MyNavBar />
      <SearchBar setquery={setquery}></SearchBar>
      <div className="usableArea">
        {!error ? renderLastRel() : renderError()}
        {<CommentArea asin={asin} inputClass={asin ? "visible" : ""} />}
      </div>
    </>
  );
}

export default Home;
