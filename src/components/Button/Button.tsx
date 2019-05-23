import React, { useState } from 'react'

interface ButtonProps {
  text: string;
}

export const Button = ({ text }: ButtonProps) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    const add = count + 1;
    setCount(add);
  };
  return (
    <div className="nui__btn" onClick={handleClick}>
      {text} - {count}
    </div>
  );
};
