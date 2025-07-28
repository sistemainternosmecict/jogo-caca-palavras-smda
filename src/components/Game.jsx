import { useState, useRef, useEffect } from "react";
import Cell from "./Cell";
import PopUpAnimal from "./PopUpAnimal";
import passarosBg from "./fundo-passaros.png"
import mamiferosBg from "./fundo-mamiferos.png"
import "../index.css";

export default function Game({ animals, duration, onRestart, grid, theme}) {
  const gridRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [found, setFound] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [popupWord, setPopupWord] = useState(null);

  const animaisRestantes = animals.filter(
    (animal) => !found.some((f) => f.word === animal)
  );

  // TIMER
  useEffect(() => {
    if (gameOver || hasWon) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, hasWon, resetKey]);

  // Verifica vitória
  useEffect(() => {
    if (!gameOver && found.length === animals.length) {
      setHasWon(true);
      setGameOver(true);
    }
  }, [found, gameOver]);

  const handleTouchStart = (row, col) => {
    if (gameOver) return;
    setIsMouseDown(true);
    setSelected([{ row, col, letter: grid[row][col] }]);
  };

  const handleTouchMove = (e) => {
    if (!isMouseDown || !gridRef.current || gameOver) return;

    const touch = e.touches[0];
    const rect = gridRef.current.getBoundingClientRect();
    const cellSize = gridRef.current.clientWidth / grid[0].length;

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (
      row >= 0 &&
      row < grid.length &&
      col >= 0 &&
      col < grid[0].length &&
      !selected.some((c) => c.row === row && c.col === col)
    ) {
      setSelected((prev) => [...prev, { row, col, letter: grid[row][col] }]);
    }

    e.preventDefault();
  };

  const handleMouseDown = (row, col) => {
    if (gameOver) return;
    setIsMouseDown(true);
    setSelected([{ row, col, letter: grid[row][col] }]);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMouseDown || gameOver) return;

    const alreadySelected = selected.some(
      (c) => c.row === row && c.col === col
    );
    if (!alreadySelected) {
      setSelected([...selected, { row, col, letter: grid[row][col] }]);
    }
  };

  const handleMouseUp = () => {
    if (gameOver) return;

    const word = selected.map((c) => c.letter).join("");
    if (animals.includes(word) && !found.some((f) => f.word === word)) {
      setFound([...found, { word, positions: selected }]);
      setPopupWord(word);
    }
    setSelected([]);
    setIsMouseDown(false);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const restartGame = () => {
    setSelected([]);
    setFound([]);
    setIsMouseDown(false);
    // setTimeLeft(TEMPO_PADRAO);
    setTimeLeft(duration)
    setGameOver(false);
    setHasWon(false);
    setResetKey((prev) => prev + 1);
    onRestart()
  };

  return (
    <div className="game-container" style={{backgroundPosition:"center", backgroundSize: "cover", backgroundImage: `url(${(theme == "mamiferos" ? mamiferosBg :passarosBg)})`}}>
      <div className="horizontal-container">
        <div
          className="grid"
          ref={gridRef}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        >
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => {
              const isSelected = selected.some(
                (c) => c.row === rowIndex && c.col === colIndex
              );
              const isPartOfFoundWord = found.some((f) =>
                f.positions.some(
                  (c) => c.row === rowIndex && c.col === colIndex
                )
              );
              return (
                <Cell
                  key={`${rowIndex}-${colIndex}-${resetKey}`}
                  letter={letter}
                  isSelected={isSelected}
                  isFound={isPartOfFoundWord}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onTouchStart={() => handleTouchStart(rowIndex, colIndex)}
                  onTouchMove={handleTouchMove}
                />
              );
            })
          )}
        </div>

        <div className="words-panel">
          {/* <h1 id="titulo_jogo">Caça palavras</h1> */}
          <h2>Tempo restante: <span id="tempo">{formatTime(timeLeft)}</span></h2>

          {gameOver && (
            <div className="mensagem-final">
              {hasWon ? (
                <h2 style={{ color:"white", backgroundColor: "green", border: "solid 1px white", padding: "10px" }}>Parabéns! Você venceu!</h2>
              ) : (
                <h2 style={{ color:"white", backgroundColor: "red", border: "solid 1px white", padding: "10px" }}>Que pena! Você perdeu!</h2>
              )}
              <button onClick={restartGame}>Recomeçar</button>
            </div>
          )}

          {!gameOver && (
            <>
              <h2>Objetivo: Encontrar os seguintes animais</h2>
              <ul>
                {animaisRestantes.map((animal, idx) => (
                  <li key={idx}>{animal}</li>
                ))}
              </ul>
              <h2>Encontrados</h2>
              <ul>
                {found.map((w, i) => (
                  <li key={i}>{w.word}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <PopUpAnimal
        word={popupWord}
        onClose={() => {
          console.log("Pop-up fechando...");
          setPopupWord(null);
        }}
        duration={3000}
      />

    </div>
  );
}
