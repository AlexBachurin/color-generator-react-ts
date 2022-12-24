import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

type SingleColorProps = {
  rgb: number[];
  weight: number;
  index: number;
  hexColor: string;
};

const SingleColor: React.FC<SingleColorProps> = ({
  rgb,
  weight,
  index,
  hexColor,
}) => {
  const [copyAlert, setCopyAlert] = useState(false);
  // transform rgb array into string to display each color as backgroundColor
  const bcg = rgb.join(",");
  // transform with helper function to hex
  // const hex = rgbToHex(...rgb);
  const hexValue = `#${hexColor}`;

  //copy to clipboard
  const copyToClipboard = () => {
    setCopyAlert(true);
    navigator.clipboard.writeText(hexValue);
  };
  // hide alert
  useEffect(() => {
    let timerId = setTimeout(() => {
      setCopyAlert(false);
    }, 3000);
    return () => clearTimeout(timerId);
  }, [copyAlert]);
  return (
    // if index > 10(means more dark bcg) change class to display more light description
    <article
      className={`color ${index > 10 ? "color-light" : null} `}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={copyToClipboard}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {copyAlert ? <p className="alert">copied to clipboard</p> : null}
    </article>
  );
};

export default SingleColor;
