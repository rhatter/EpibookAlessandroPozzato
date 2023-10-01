import React, { useState, useEffect } from "react";
import "./CommentArea.css";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import SingleComment from "../SingleComment/SingleComent";
//importo redux
import { useSelector, useDispatch } from "react-redux";

function CommentArea({ asin, inputClass }) {
  const [inComment, setInComment] = useState(false);
  const [commentVisibility, setCommentVisibility] = useState(false);
  const [votation, setVotation] = useState(0);
  const [errorOnPost, setErrorOnPost] = useState(false);
  const [dataToPost, setDataToPost] = useState({ elementId: "" });
  const [comments, setComments] = useState([]);

  const activeAsin = useSelector((state) => state.asin.value);

  useEffect(() => {
    setDataToPost((prevstate) => ({ elementId: activeAsin }));
  }, [activeAsin]);

  useEffect(() => {
    getComment();
  }, []);

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

  function addVotation(number) {
    setDataToPost((prevstate) => ({ ...prevstate, rate: number }));
    setErrorOnPost(false);
    console.log(dataToPost);
  }

  function addComment(e) {
    setDataToPost((prevstate) => ({ ...prevstate, comment: e.target.value }));
    console.log(dataToPost);
    setErrorOnPost(false);
  }

  function changeInCommentState() {
    inComment ? setInComment(false) : setInComment(true);
  }

  function changeCommentVisibility() {
    commentVisibility
      ? setCommentVisibility(false)
      : setCommentVisibility(true);
  }

  async function postData() {
    try {
      const res = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTU5OTQ1MzgsImV4cCI6MTY5NzIwNDEzOH0.sZslGtsjtRsYmH-3H88w2cP33RjrkWmieqsYLS_spFs",
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(dataToPost),
        }
      );
      const data = await res.json;
      getComment();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  function createCommentReadingArea() {
    const classAreaReading = `commentAreaReading container-fluid `;
    return (
      <div className={classAreaReading}>
        <div className="head">
          {comments.filter((book) => book.elementId === activeAsin).length >
          0 ? (
            <p>Commenti</p>
          ) : (
            <p className="noComment">
              Non ci sono ancora commenti per questo libro, commenta per primo!
            </p>
          )}
        </div>
        <SingleComment comments={comments} asin={activeAsin} />
      </div>
    );
  }

  function changeVotation(number) {
    setVotation(number);
  }

  function errorOnPostMessage() {
    return (
      <p>
        {!dataToPost.rate
          ? "Errore, inserisci una valutazione"
          : "Errore, inserisci un commento"}
      </p>
    );
  }

  function createCommentInputArea() {
    return (
      <div className="commentAreaInput">
        <div
          className="stars"
          onMouseOut={() =>
            changeVotation(dataToPost.rate ? dataToPost.rate : 1)
          }
        >
          <FontAwesomeIcon
            icon={votation >= 1 ? faStar : farStar}
            className="pino"
            onMouseOver={() => changeVotation(1)}
            onClick={() => addVotation(1)}
          />
          <FontAwesomeIcon
            icon={votation >= 2 ? faStar : farStar}
            className="pino"
            onMouseOver={() => changeVotation(2)}
            onClick={() => addVotation(2)}
          />
          <FontAwesomeIcon
            icon={votation >= 3 ? faStar : farStar}
            className="pino"
            onMouseOver={() => changeVotation(3)}
            onClick={() => addVotation(3)}
          />
          <FontAwesomeIcon
            icon={votation >= 4 ? faStar : farStar}
            className="pino"
            onMouseOver={() => changeVotation(4)}
            onClick={() => addVotation(4)}
          />
          <FontAwesomeIcon
            icon={votation >= 5 ? faStar : farStar}
            className="pino"
            onMouseOver={() => changeVotation(5)}
            onClick={() => addVotation(5)}
          />
        </div>
        <textarea
          name="Text1"
          cols="40"
          rows="5"
          placeholder="Fai sapere a tutti cosa ne pensi!"
          onChange={(e) => addComment(e)}
        ></textarea>
        <div className="buttonArea">
          <button onClick={() => changeInCommentState()}>Annulla</button>
          <button onClick={() => postComment()}>Commenta</button>
        </div>
        {errorOnPost && errorOnPostMessage()}
      </div>
    );
  }

  function postComment() {
    if (!dataToPost.rate && !dataToPost.comment) {
      setErrorOnPost(true);
    } else {
      changeInCommentState();
      setErrorOnPost(false);
      console.log(postData());
    }
  }

  return (
    <div className={`${inputClass}`}>
      {inComment && createCommentInputArea()}
      {!inComment && (
        <div className={`goToCommentArea ${inputClass}`}>
          <button onClick={() => changeInCommentState()}>Nuovo commento</button>
        </div>
      )}
      {comments.filter((book) => book.elementId === activeAsin).length > 0 && (
        <div className="seeComment" onClick={() => changeCommentVisibility()}>
          <button
            style={commentVisibility ? { height: "21px" } : { height: "auto" }}
          >
            {commentVisibility ? (
              <FontAwesomeIcon icon={faSortUp} />
            ) : (
              "Leggi i commenti"
            )}
          </button>
        </div>
      )}
      {commentVisibility && createCommentReadingArea()}
    </div>
  );
}
export default CommentArea;
