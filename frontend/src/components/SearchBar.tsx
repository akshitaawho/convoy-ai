type SearchBarProps = {
  searchText: string;
  setSearchText: (value: string) => void;
  searchLocation: () => void;
  getSuggestions: (text: string) => void;
  suggestions: any[];
  selectSuggestion: (place: any) => void;
};

export default function SearchBar({
  searchText,
  setSearchText,
  searchLocation,
  getSuggestions,
  suggestions,
  selectSuggestion,
}: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search location..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          getSuggestions(e.target.value);
        }}
      />

      <button onClick={searchLocation}>
        Search
      </button>

      {suggestions.length > 0 && (
        <div
          style={{
            border: "1px solid #ccc",
            maxWidth: "400px",
            backgroundColor: "white",
          }}
        >
          {suggestions.map((place, index) => (
            <div
              key={index}
              onClick={() => selectSuggestion(place)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{place.name}</strong>
                <br />
                <small>{place.display_name}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}