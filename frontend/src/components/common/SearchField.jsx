const SearchField = ({ value, onChange, placeholder = 'Search…' }) => (
  <div className="search-field">
    <input
      type="search"
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
    />
  </div>
);

export default SearchField;
