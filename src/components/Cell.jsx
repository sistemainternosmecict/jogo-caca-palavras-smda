import "../index.css";

export default function Cell({
  letter,
  isSelected,
  isFound,
  onMouseDown,
  onMouseEnter,
  onTouchStart,
  onTouchMove,
}) {
  const classNames = ["cell"];
  if (isSelected) classNames.push("selected");
  if (isFound) classNames.push("found");

  return (
    <div
      className={classNames.join(" ")}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {letter}
    </div>
  );
}