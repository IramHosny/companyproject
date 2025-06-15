import React, { useEffect, useRef, useState } from "react";

function Article360({ images = [] }) {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const intervalRef = useRef(null);
  const total = images.length;

  useEffect(() => {
    if (!isZoomed) startAutoRotate();
    return stopAutoRotate;
  }, [isZoomed, total]);

  const startAutoRotate = () => {
    stopAutoRotate();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 200);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleClick = () => {
    stopAutoRotate();
    setIsZoomed(true);
  };

  const handleDoubleClick = () => {
    setIsZoomed(false);
    setOffset({ x: 0, y: 0 });
    startAutoRotate();
  };

  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    setStartOffset(offset);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed || !isDragging) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setOffset({
      x: startOffset.x + dx,
      y: startOffset.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePrev = () => {
    stopAutoRotate();
    setIsZoomed(false);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    stopAutoRotate();
    setIsZoomed(false);
    setIndex((prev) => (prev + 1) % total);
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
        userSelect: "none",
        cursor: isZoomed ? "grab" : "pointer",
        overflow: "hidden",
      }}
    >
      <img
        src={images[index]}
        alt={`360-${index}`}
        onError={(e) => (e.target.src = "/default360.jpg")}
        style={{
          width: "100%",
          transform: isZoomed
            ? `scale(2.5) translate(${offset.x}px, ${offset.y}px)`
            : "scale(1) translate(0, 0)",
          transition: isDragging ? "none" : "transform 0.3s ease",
          display: "block",
          pointerEvents: "none",
        }}
      />

      {!isZoomed && (
        <>
          <button onClick={handlePrev} style={arrowStyle("left")}>
            ◀
          </button>
          <button onClick={handleNext} style={arrowStyle("right")}>
            ▶
          </button>
        </>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#00000099",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: 4,
          fontSize: "0.8rem",
        }}
      >
        {isZoomed
          ? "🖱️ Glisser pour explorer — Double clic pour relancer"
          : "🖱️ Clic pour zoom — Double clic pour rotation auto"}
      </div>
    </div>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: 10,
  transform: "translateY(-50%)",
  background: "#00000099",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: 35,
  height: 35,
  fontSize: 18,
  cursor: "pointer",
  zIndex: 10,
});

export default Article360;
