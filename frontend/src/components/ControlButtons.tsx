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
    <div className="flex flex-wrap gap-3">
      <button
        onClick={clearRoute}
        className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition"
      >
        Clear Route
      </button>

      <button
        onClick={undoLastStop}
        className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition"
      >
        Undo Last Stop
      </button>

      <button
        onClick={generateRoute}
        className="px-4 py-2 rounded-xl bg-[#FF856D] text-white hover:opacity-90 transition"
      >
        Generate Route
      </button>
    </div>
  );
}