import React from 'react'

const colors = [
  "#cd5c5c",
  "#4682B4",
  "#FFF8DC",
  "#7FFF00",
  "#663399",
  "#FFD700",
  "#FFE764",
  "#ffff82",
  "#32CD32",
  "#9370DB",
  "#6A5ACD",
  "#000000",
];

const ColorsSaved = ({ handleColor }) => {
  return (
    <div className="selectors">
    {colors.map((elem, index) => {
      return (
        <div
          key={index}
          onClick={() => handleColor(elem)}
          style={{ backgroundColor: elem }}
          className="select-color"
        />
      );
    })}
  </div>
  )
}

export default ColorsSaved