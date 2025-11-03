import { useState } from "react";
import logoEdu from "./logo_edu_smda.svg"
import "./StartScreen.css"
import styled from "styled-components";

const Logo = styled.img`
  width: 400px;
  // margin-bottom: 32px;
  background-color: rgba(70, 41, 15, 0.96);
  // box-shadow: 0 4px 16px rgba(0,0,0,0.8);
  padding: 32px;
  border-radius: 8px;
  border: solid 2px rgba(189, 145, 106, 0.96);
  //filter: drop-shadow(0 0 16px rgba(255, 215, 130, 0.4)) grayscale(100%) brightness(0);
`;

export default function StartScreen({ onStart }) {
  const [theme, setTheme] = useState("gatos");
  const [time, setTime] = useState(3);

  const handleStart = () => {
    onStart({ theme, time });
  };

  return (
    <div className="start-screen" >
      <Logo src="./logo_caca_palavras.png" alt="logo" />

      <div className="horizontal" style={{display: "flex", justifyContent: "space-between", width: "100%", maxWidth: "600px"}}>
        <label style={{width: "100%", maxWidth: "300px", margin: "4px", boxShadow:"0 0 4px black", background: "rgba(255,255,255,0.8)"}}>
          Tema:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="gatos">Gatos</option>
            <option value="cachorros">Cachorros</option>
          </select>
        </label>

        <label style={{width: "100%", maxWidth: "300px", margin: "4px", boxShadow:"0 0 4px black", background: "rgba(255,255,255,0.8)"}}>
          Tempo de jogo (min):
          <input
            type="number"
            value={time}
            min="3"
            max="10"
            step="1"
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </label>
      </div>

      <button style={{margin: 0, width: "100%", maxWidth: "600px"}} onClick={handleStart}>Iniciar Jogo</button>


      <footer style={{padding: "8px 0", position: "absolute", bottom: 0}} id="rodape">
        <figure>
          <img style={{width: "400px"}} className="logoEdu" src={logoEdu} alt="logo_da_secretaria_de_educação" />
        </figure>
      </footer>
    </div>
  );
}