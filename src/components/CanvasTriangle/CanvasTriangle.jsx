import React, { useRef, useState, useEffect } from "react";

export function CanvasTriangle(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(1000, 0);
    context.lineTo(1000, 300);
    context.lineTo(700, 300);
    context.closePath();
    context.lineWidth = 1;
    context.fillStyle = "darkred";
    context.fill();
  }, []);

  return (
    <canvas
      className="trianglePrice"
      ref={canvasRef}
      width={props.width}
      height={props.height}
    />
  );
}
