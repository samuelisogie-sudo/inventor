import { useState } from "react";

const Create = ({ onAdd }) => {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("productName") ?? "").trim();
    const rawQuantity = formData.get("quantity");
    const quantity = Number(rawQuantity);

    if (!name || !Number.isInteger(quantity) || quantity < 0) {
      setError("Enter a product name and a whole-number quantity of zero or more.");
      return;
    }

    onAdd({ name, quantity });
    event.currentTarget.reset();
    setError("");
  }

  return (
    <section
      aria-labelledby="add-product-heading"
      className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
        <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <svg
                aria-hidden="true"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m7-7H5"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Inventory management
              </p>
              <h1
                id="add-product-heading"
                className="mt-1 text-2xl font-bold tracking-tight text-slate-900"
              >
                Add a product
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Add an item and its quantity to your inventory.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <form
            className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_12rem_auto] sm:items-end"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-800"
                htmlFor="product-name"
              >
                Product name
              </label>
              <input
                id="product-name"
                name="productName"
                type="text"
                maxLength={100}
                required
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-emerald-600 focus:bg-white focus:ring-emerald-600"
                placeholder="e.g. Black Marker"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-800"
                htmlFor="product-quantity"
              >
                Quantity
              </label>
              <input
                id="product-quantity"
                name="quantity"
                type="number"
                min="0"
                step="1"
                required
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-emerald-600 focus:bg-white focus:ring-emerald-600"
                placeholder="0"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 sm:min-w-36"
            >
              <svg
                aria-hidden="true"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m7-7H5"
                />
              </svg>
              Add product
            </button>
          </form>

          {error && (
            <p
              className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Create;
