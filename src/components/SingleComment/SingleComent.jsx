import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function SingleComment({ comments, asin }) {
  return comments
    .filter((book) => book.elementId === asin)
    .map((comment) => (
      <div className="commentBox" key={nanoid()}>
        <div className="commentHead">
          <p className="comment">{comment.comment}</p>
          <p className="userName">{comment.author}</p>
        </div>
      </div>
    ));
}

export default SingleComment;
