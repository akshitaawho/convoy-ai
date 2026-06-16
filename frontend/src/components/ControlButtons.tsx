type ControlButtonsProps = {
  clearRoute: () => void;
  undoLastStop: () => void;
  generateRoute: () => void;
  saveRoute: () => void;
};

export default function ControlButtons({
  clearRoute,
  undoLastStop,
  generateRoute,
  saveRoute,
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

      <button
        onClick={saveRoute}
        className="px-4 py-2 rounded-xl border border-[#FF856D] text-[#FF856D] hover:bg-[#FFF3F0] transition"
      >
        Save Route
      </button>
    </div>
  );
}