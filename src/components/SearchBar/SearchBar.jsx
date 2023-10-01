import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";

function SearchBar({ setquery }) {
  const [queryOnInput, setqueryOnInput] = useState("");

  const searchBook = () => {
    setquery(queryOnInput);
  };

  const handleKeyUp = (e) => {
    const searchBook = () => {
      setquery(queryOnInput);
    };

    if (e.keyCode === 13) {
      searchBook();
    }
  };
  const handleChange = (e) => {
    setqueryOnInput(e.target.value.toLowerCase());
  };

  return (
    <>
      <Container className="searchMain" fluid>
        <Col xs={10} sm={8} md={6} lg={4} className="searchArea">
          <p className="mainCaption">
            Un viaggio in mondi <br />
            che puoi solo immaginare
          </p>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Find your Book"
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            />
            <Button onClick={searchBook}>Search</Button>
          </InputGroup>
        </Col>
      </Container>
    </>
  );
}
export default SearchBar;
