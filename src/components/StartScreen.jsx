import { useState } from "react";
import logoEdu from "./edu1.png"
import "./StartScreen.css"

export default function StartScreen({ onStart }) {
  const [theme, setTheme] = useState("gatos");
  const [time, setTime] = useState(3);

  const handleStart = () => {
    onStart({ theme, time });
  };

  return (
    <div className="start-screen">
      <h1>Caça-Palavras</h1>

      <label>
        Tema:
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="gatos">Gatos</option>
          <option value="cachorros">Cachorros</option>
        </select>
      </label>

      <label>
        Tempo de jogo (minutos):
        <input
          type="number"
          value={time}
          min="3"
          max="10"
          step="1"
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </label>

      <button onClick={handleStart}>Iniciar Jogo</button>

      <footer id="rodape">
        <figure>
          <img className="logoEdu" src={logoEdu} alt="logo_da_secretaria_de_educação" />
          <img className="logoEdu" src="./logo-smda.svg" alt="logo_da_secretaria_do_direito_dos_animais" />
        </figure>
        <p>Uma parceria entre Secretaria Municipal de Educação e Secretaria Municipal do Direito dos Animais</p>
      </footer>
    </div>
  );
}