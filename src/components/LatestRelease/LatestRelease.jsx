import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import SingleBook from "../SingleBook/SingleBook";
import { nanoid } from "nanoid";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/esm/Col";
import "./LatestRelease.css";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LatestRelease({ books, isLoading, query, setActiveAsin }) {
  const [visibleBook, setvisibleBook] = useState(10);
  const [comments, setComments] = useState([]);

  function addBooks(increment) {
    setvisibleBook((prevState) => prevState + increment);
  }

  async function getComment() {
    const res = await fetch(
      "https://striveschool-api.herokuapp.com/api/comments/",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTU5OTQ1MzgsImV4cCI6MTY5NzIwNDEzOH0.sZslGtsjtRsYmH-3H88w2cP33RjrkWmieqsYLS_spFs",
        },
      }
    );
    const data = await res.json();
    setComments(data);
  }

  useEffect(() => {
    getComment();
  }, []);

  const renderLoading = () => {
    return (
      <div className="spinnerArea">
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
      </div>
    );
  };
  const renderBookList = () => {
    return (
      <Col xs={11}>
        <Row>
          {books
            .filter((book) => book.title.toLowerCase().includes(query))
            .slice(1, visibleBook)
            .map((book) => (
              <SingleBook
                key={nanoid()}
                title={book.title}
                imgUrl={book.img}
                price={book.price}
                asin={book.asin}
                comments={comments}
                setActiveAsin={setActiveAsin}
              />
            ))}
        </Row>
      </Col>
    );
  };
  return (
    <main className="areaBooks">
      <div className="inputArea">
        {isLoading ? renderLoading() : renderBookList()}
      </div>
      <div className="goDownArea">
        <div className="goDownButton" onClick={() => addBooks(10)}>
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </div>
    </main>
  );
}
export default LatestRelease;
