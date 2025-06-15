import React, { useState } from "react";

function Simulated3DView({ images }) {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={images[current]}
        alt={`view-${current}`}
        style={{ width: "300px", height: "300px", objectFit: "contain" }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={prevImage}>◀</button>
        <span style={{ margin: "0 10px" }}>
          Vue {current + 1} / {images.length}
        </span>
        <button onClick={nextImage}>▶</button>
      </div>
    </div>
  );
}

export default Simulated3DView;
