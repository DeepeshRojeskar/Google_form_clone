import React, { useState } from "react";

const Drop = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      className={showDrop ? "display-drop" : "Hide-drop"}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}>
      :Drop Here:
    </div>
  );
};

export default Drop;
