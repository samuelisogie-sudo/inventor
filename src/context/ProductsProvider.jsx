import { useState } from "react";
import { ProductContext } from "./productContext.jsx";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
