interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
}

function FilterInput({ value, onChange }: FilterInputProps) {
  return (
    <label className="filter-input">
      <span>Filter by title</span>
      <input
        type="text"
        placeholder="Search books..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default FilterInput;
