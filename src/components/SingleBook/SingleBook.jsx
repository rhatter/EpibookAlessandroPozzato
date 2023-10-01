import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import "./SingleBook.css";
import CommentArea from "../CommentArea/CommentArea";
import { CanvasTriangle } from "../CanvasTriangle/CanvasTriangle";
// Importo i reducers
import { useSelector, useDispatch } from "react-redux";
import { asinUpdate } from "../../reducers/generalAsin";
//importo router dom
import { Link } from "react-router-dom";

function SingleBook({ imgUrl, title, price, asin, comments }) {
  //Uso il redux
  const activeAsin = useSelector((state) => state.asin.value);
  const dispatch = useDispatch();

  const select = () => {
    dispatch(asinUpdate(asin));
    console.log(asin);
  };

  return (
    <Col className="cardArea" sm={12} md={6} lg={4} xl={3}>
      <Card className="cardEl">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Img variant="top" src={imgUrl} />{" "}
        <Card.Body className="priceArea">
          <div className="price">
            <span>
              <sub>€</sub>
              {price}
            </span>
          </div>
        </Card.Body>
        <CanvasTriangle width={1000} height={300}></CanvasTriangle>
      </Card>
      <Link to={`/book/${asin}`}>
        <div className="goToDetailsArea">
          <button>Dettagli</button>
        </div>
      </Link>
      <div className="goToDetailsArea">
        <button onClick={() => select()}>Commenti</button>
      </div>
    </Col>
  );
}
export default SingleBook;
