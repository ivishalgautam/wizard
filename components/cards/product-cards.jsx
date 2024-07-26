import React from "react";
import ProductCard from "./product";

export default function ProductCards({
  products = [],
  handleSubmit,
  isLoading,
}) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* {JSON.stringify(filteredProducts())} */}
      {products.map((product, key) => (
        <ProductCard
          ind={key}
          isLoading={isLoading}
          key={key}
          product={product}
          handleSubmit={handleSubmit}
        />
      ))}
    </div>
  );
}
