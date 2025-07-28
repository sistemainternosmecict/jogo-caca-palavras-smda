import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";

import { mamiferos } from "./components/words/mamiferos";
import { passaros } from "./components/words/passaros";
import { generateWordSearch } from "./components/GridGenerator";

export default function App() {
  const [config, setConfig] = useState(null);
  const [bgUrl, setBgUrl] = useState(null)

  const handleStart = ({ theme, time }) => {
    setBgUrl(theme)
    let wordList = [];
    if (theme === "mamiferos") {
      wordList = mamiferos;
    }
    if (theme === "passaros") {
      wordList = passaros;
    }
    
    const grid = generateWordSearch(wordList)
    setConfig({ words: wordList, time, grid});
  };

  const handleRestart = () => {
    setConfig(null); // volta para tela inicial
  };

  return config ? (
    <Game
      animals={config.words}
      duration={config.time}
      onRestart={handleRestart}
      grid={config.grid}
      theme={bgUrl}
    />
  ) : (
    <StartScreen onStart={handleStart} />
  );
}
