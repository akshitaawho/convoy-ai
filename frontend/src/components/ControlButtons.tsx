type ControlButtonsProps = {
  clearRoute: () => void;
  undoLastStop: () => void;
  generateRoute: () => void;
};

export default function ControlButtons({
  clearRoute,
  undoLastStop,
  generateRoute,
}: ControlButtonsProps) {
  return (
    <div>
      <button onClick={clearRoute}>
        Clear Route
      </button>

      {" "}

      <button onClick={undoLastStop}>
        Undo Last Stop
      </button>

      {" "}

      <button onClick={generateRoute}>
        Generate Route
      </button>
    </div>
  );
}