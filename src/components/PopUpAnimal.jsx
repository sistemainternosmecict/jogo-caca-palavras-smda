import React, { useEffect } from "react";
import "./PopUpAnimal.css";

export default function PopUpAnimal({ word, onClose, duration = 3000, theme }) {
  useEffect(() => {
    if (!word) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [word, duration]);

  if (!word) return null;

  const normalize = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ç/g, "c")
      .toLowerCase();

      
  const extensoes = ['.avif', '.webp', '.png', '.jpg'];
      
  function encontrarImagem(nomeBase) {
    for (const ext of extensoes) {
      try {
        return require(`../../public/animais/${theme}/${normalize(nomeBase)}${ext}`);
      } catch (e) {
        continue;
      }
    }
    return null;
  }

  const imagePath = encontrarImagem(word);

  return (
    <div className="popup-overlay">
      <div className="popup-window">
        <img src={imagePath} alt={word} />
      </div>
    </div>
  );
}
