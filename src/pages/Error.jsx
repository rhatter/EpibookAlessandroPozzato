import React from "react";
import { useParams } from "react-router-dom";
import MyNavBar from "../components/NavBar/NavBar";
import DetailedCard from "../components/Detailed Card/DetailedCard";

export default function Error() {
  const { bookId } = useParams();
  console.log(bookId);

  return (
    <>
      <MyNavBar />
      <div className="errorarea">
        <span className="Error">
          404 <br></br>Torna indietro, alcune strade <br></br> non portano da
          nessuna parte...
        </span>
      </div>
    </>
  );
}
