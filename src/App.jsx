
import { useState } from "react";
import { products } from "./Challenges/Products.js";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Generate categories dynamically
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  // Apply search and category filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    if (sortBy === "rating-high") {
      return b.rating - a.rating;
    }

    return 0;
  });

  // Calculate average price
  const averagePrice =
    sortedProducts.length > 0
      ? sortedProducts.reduce(
          (total, product) => total + product.price,
          0
        ) / sortedProducts.length
      : 0;

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("default");
  };

  return (
    <div>
      <h1>Product Store</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Sorting */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Default Sorting</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating-high">Rating: High to Low</option>
      </select>

      {/* Clear Filters */}
      <button onClick={clearFilters}>
        Clear Filters
      </button>

      {/* Product Count */}
      <p>
        Showing {sortedProducts.length} of {products.length} products
      </p>

      {/* Average Price */}
      <p>
        Average Price: ₹{averagePrice.toFixed(2)}
      </p>
      {/* Product List */}
      <div className="product-grid">
  {sortedProducts.length > 0 ? (
    sortedProducts.map((product) => (
      <div className="product-card" key={product.id}>
        <h2>{product.name}</h2>
        <p>Category: {product.category}</p>
        <p>Price: ₹{product.price}</p>
        <p>Rating: ⭐ {product.rating}</p>
      </div>
    ))
  ) : (
    <p>No products found!</p>
  )}
  </div>
    </div>
  );
}
export default App;