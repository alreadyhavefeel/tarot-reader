import React, { useState, useEffect } from 'react';
import '../../../public/Card.css'; // Make sure to import your CSS file

const Cards = ({ imageBack, imageFront, index, onSelect, isSelected }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!isSelected) {
      console.log(isSelected)
      setFlipped(false);
    }
  }, [isSelected]);


  function handleCardSelect(index) {
    setSelectedIndex(index);
  };

  function handleClick() {
    setFlipped((prev) => !prev);
    onSelect();
  }

  return (
    <div
      style={{
        transform: flipped ? 'perspective(500px) translateZ(200px)' : 'translate(0px, 0px)',
        transition: 'transform 0.5s',
        position: 'relative',
        zIndex: flipped ? 2 : 1,
      }}
      onClick={() => handleClick(index)}
    >
      <img
        src={imageFront}
        alt="Tarot Card"
        className="w-16 h-24 rounded-md"
        style={{
          
         }}
      />
    </div>
  );
};

export default Cards;


