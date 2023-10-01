import React from "react";
import { useParams } from "react-router-dom";
import MyNavBar from "../components/NavBar/NavBar";
import DetailedCard from "../components/Detailed Card/DetailedCard";

export default function Details() {
  const { bookId } = useParams();
  console.log(bookId);

  return (
    <>
      <MyNavBar />
      <DetailedCard bookId={bookId} />
    </>
  );
}
