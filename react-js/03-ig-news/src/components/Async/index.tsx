import React, { useEffect, useState } from "react";

const Async: React.FC = () => {
  const [hasButton, setHasButton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasButton(true);
    }, 1000);
  }, []);
  return (
    <div>
      <div>{hasButton && <button>Button name</button>}</div>
    </div>
  );
};

export default Async;
