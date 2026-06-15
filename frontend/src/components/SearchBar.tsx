type SearchBarProps = {
  searchText: string;
  setSearchText: (value: string) => void;
  searchLocation: () => void;
  getSuggestions: (text: string) => void;
  suggestions: any[];
  selectSuggestion: (place: any) => void;
  mapCenter: [number, number];
};

export default function SearchBar({
  searchText,
  setSearchText,
  searchLocation,
  getSuggestions,
  suggestions,
  selectSuggestion,
  mapCenter,
}: SearchBarProps) {
  return (
    <div className="mb-6 relative">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Where are you going?"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            getSuggestions(e.target.value);
          }}
          className="
            flex-1
            px-4
            py-3
            rounded-xl
            border
            border-gray-300
            bg-white
            focus:outline-none
            focus:border-[#FF856D]
          "
        />

        <button
          onClick={searchLocation}
          className="
            px-5
            py-3
            rounded-xl
            bg-[#FF856D]
            text-white
            font-medium
            hover:opacity-90
            transition
          "
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <div
          className="
            absolute
            z-[9999]
            mt-2
            w-full
            bg-white
            border
            border-gray-200
            rounded-xl
            overflow-hidden
          "
        >
          {suggestions.map((place, index) => (
            <div
              key={index}
              onClick={() => selectSuggestion(place)}
              className="
                px-4
                py-3
                cursor-pointer
                hover:bg-gray-100
                border-b
                border-gray-100
              "
            >
              <div className="font-medium">
                {place.name}
              </div>

              <div className="text-sm text-gray-500">
                {place.display_name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}