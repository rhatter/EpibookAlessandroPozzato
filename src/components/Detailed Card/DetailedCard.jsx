import React from "react";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import "./DetailedCard.css";

export default function DetailedCard({ bookId }) {
  const [thisBook, setThisBook] = useState({});

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const res = await fetch("https://epibooks.onrender.com/");
      const data = await res.json();
      console.log(data.filter((book) => book.asin === bookId)[0]);
      setThisBook(data.filter((book) => book.asin === bookId)[0]);
    } catch (error) {}
  }
  return (
    <div className="detailedSingleBookArea">
      <Col xs={7} md={5} lg={4} xl={3}>
        <div className="detailedSingleBookCard">
          <img src={thisBook.img} alt="" />
          <p className="title">{thisBook.title}</p>
          <div className="detailedPriceArea">
            <span>asin: {thisBook.asin} </span>
            <span className="mediumRating">
              <sub>€</sub>
              {thisBook.price}
            </span>
          </div>
        </div>
      </Col>
    </div>
  );
}
