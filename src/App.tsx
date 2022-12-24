import React, { useState, useEffect } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [inputColor, setInputColor] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [list, setList] = useState<Values[]>(new Values("#32cd32").all(10));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let colors = new Values(inputColor).all(10);
      setList(colors);
    } catch (error) {
      setError(true);
      setErrorText("provide valid value of color");
    }
  };

  //reset error after few secs
  useEffect(() => {
    let timerId = setTimeout(() => {
      setError(false);
      setErrorText("");
    }, 3000);
    return () => clearTimeout(timerId);
  }, [error]);
  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputColor}
              onChange={(e) => setInputColor(e.target.value)}
              placeholder="#32cd32"
              className={`${error ? "error" : null}`}
            />
            <button className="btn" type="submit">
              submit
            </button>
          </form>
          <div className="error-msg">{errorText}</div>
        </div>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
