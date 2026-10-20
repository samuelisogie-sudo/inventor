import { useEffect, useState } from "react";
import Header from "./components/header.jsx";
import Create from "./components/create.jsx";
import Products from "./components/products.jsx";
import Footer from "./components/footer.jsx";

const STORAGE_KEY = "invento-products";

const defaultProducts = [
  { id: 1, name: "Black Marker", quantity: 5 },
  { id: 2, name: "Red Marker", quantity: 10 },
];

function loadProducts() {
  try {
    const savedProducts = window.localStorage.getItem(STORAGE_KEY);
    if (savedProducts === null) {
      return { products: defaultProducts, error: "" };
    }

    const parsedProducts = JSON.parse(savedProducts);
    const isValid =
      Array.isArray(parsedProducts) &&
      parsedProducts.every(
        (product) =>
          product &&
          (typeof product.id === "string" || typeof product.id === "number") &&
          typeof product.name === "string" &&
          Number.isInteger(product.quantity) &&
          product.quantity >= 0,
      );

    if (!isValid) {
      throw new Error("Saved inventory has an invalid format.");
    }

    return { products: parsedProducts, error: "" };
  } catch (error) {
    console.error("Unable to load the saved inventory:", error);
    return {
      products: defaultProducts,
      error: "Saved inventory could not be loaded. Showing the default inventory.",
    };
  }
}

const App = () => {
  const [initialInventory] = useState(loadProducts);
  const [products, setProducts] = useState(initialInventory.products);
  const [storageError, setStorageError] = useState(initialInventory.error);

  useEffect(() => {
    const productLabel = products.length === 1 ? "product" : "products";
    document.title = `Invento | ${products.length} ${productLabel}`;

    return () => {
      document.title = "Invento | Inventory";
    };
  }, [products.length]);

  function saveProducts(nextProducts) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      setStorageError("");
    } catch (error) {
      console.error("Unable to save the inventory:", error);
      setStorageError("Your changes could not be saved on this device.");
    }
  }

  function handleAdd(product) {
    setProducts((previousProducts) => {
      const mergedProducts = [
        ...previousProducts,
        { ...product, id: window.crypto.randomUUID() },
      ];
      saveProducts(mergedProducts);
      return mergedProducts;
    });
  }

  function handleUpdate(updatedProduct) {
    setProducts((previousProducts) => {
      const nextProducts = previousProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );
      saveProducts(nextProducts);
      return nextProducts;
    });
  }

  function handleDelete(id) {
    setProducts((previousProducts) => {
      const nextProducts = previousProducts.filter((product) => product.id !== id);
      saveProducts(nextProducts);
      return nextProducts;
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header products={products} />
      {storageError && (
        <p
          className="mx-auto mt-5 w-full max-w-6xl px-5 text-sm text-rose-700 sm:px-8"
          role="alert"
        >
          {storageError}
        </p>
      )}
      <Create onAdd={handleAdd} />
      <Products
        products={products}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <Footer />
    </div>
  );
};

export default App;