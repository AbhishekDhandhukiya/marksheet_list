import React, { useState } from "react";
import Header from "../../header/Header";

const IfCondition = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <h2>Hello</h2>
      <button disabled={count >= 10} onClick={() => setCount(count + 1)}>
        Add
      </button>
      {count}
      <button disabled={count <= 0} onClick={() => setCount(count - 1)}>
        Remove
      </button>
    </div>
  );
};

export default IfCondition;
