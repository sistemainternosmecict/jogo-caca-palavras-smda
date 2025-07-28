import React, { useEffect } from "react";
import "./PopUpAnimal.css";

export default function PopUpAnimal({ word, onClose, duration = 3000 }) {
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

  const imagePath = `/animais/${normalize(word)}.png`;

  return (
    <div className="popup-overlay">
      <div className="popup-window">
        <img src={imagePath} alt={word} />
      </div>
    </div>
  );
}
