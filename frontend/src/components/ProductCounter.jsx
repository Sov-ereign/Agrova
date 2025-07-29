import React, { useEffect, useState } from "react";

const ProductCounter = () => {
  const [count, setCount] = useState(0);
  const target = 10; // Total number of agricultural products

  useEffect(() => {
    let current = 0;
    const increment = () => {
      if (current < target) {
        current += 1;
        setCount(current);
      }
    };
    const timer = setInterval(increment, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="product-counter">
      <div className="counter-box">
        <h2 className="counter-number">{count}+</h2>
        <p className="counter-text">Agricultural Products Supported</p>
      </div>
    </section>
  );
};

export default ProductCounter; 