// Confetti.tsx
import React, { useState } from 'react';
import Confetti from 'react-confetti-boom';


const ConfettiComponent: React.FC = () => {
  const [confettiActive, setConfettiActive] = useState(false);

  const handleClick = () => {
    setConfettiActive(true);

    // Defina o tempo que os confetes devem permanecer ativos (em milissegundos)
    setTimeout(() => {
      setConfettiActive(false);
    }, 2000);
  };

  return (
    <div>
      <button onClick={handleClick}>Lançar Confetes</button>
      {confettiActive && <Confetti />}
    </div>
  );
};

export default ConfettiComponent;
