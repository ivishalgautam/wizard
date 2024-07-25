import React from "react";
import ProductCard from "./product";

export default function ProductCards({ products }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* {JSON.stringify(filteredProducts())} */}
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}
