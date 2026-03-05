function FilterBar({ filters, onChange, onClear }) {
  return (
    <section className="filter-bar">
      <input
        type="text"
        name="search"
        placeholder="Search products"
        value={filters.search}
        onChange={onChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={filters.category}
        onChange={onChange}
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min price"
        value={filters.minPrice}
        onChange={onChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max price"
        value={filters.maxPrice}
        onChange={onChange}
      />
      <select name="sortBy" value={filters.sortBy} onChange={onChange}>
        <option value="">Sort by</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating_desc">Top Rated</option>
        <option value="name_asc">Name: A-Z</option>
      </select>
      <button className="outline-btn" onClick={onClear}>
        Clear
      </button>
    </section>
  );
}

export default FilterBar;
