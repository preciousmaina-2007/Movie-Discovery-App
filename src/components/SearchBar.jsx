function SearchBar({ query, onQueryChange, onSubmit, disabled }) {
  return (
    <form
      onSubmit={onSubmit}
      className="glass-panel flex flex-col gap-3 rounded-md p-3 sm:flex-row"
      role="search"
    >
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search movies..."
        className="form-field"
        aria-label="Search movies"
      />
      <button type="submit" className="primary-button shrink-0 sm:w-32" disabled={disabled}>
        Search
      </button>
    </form>
  )
}

export default SearchBar
