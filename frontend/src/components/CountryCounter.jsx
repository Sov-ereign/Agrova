import React, { useEffect, useState } from "react";

const CountryCounter = () => {
  const [count, setCount] = useState(0);
  const target = 99; // Total number of countries Agrova supports

  useEffect(() => {
    let current = 0;
    const increment = () => {
      if (current < target) {
        current += 1;
        setCount(current);
      }
    };
    const timer = setInterval(increment, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="country-counter">
      <div className="counter-box">
        <h2 className="counter-number">{count}+</h2>
        <p className="counter-text">Countries Predicted by Agrova</p>
      </div>
    </section>
  );
};

export default CountryCounter; 