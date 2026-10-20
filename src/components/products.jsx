import { useState } from "react";

const Products = ({ products, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editError, setEditError] = useState("");

  function handleEditSubmit(event, id) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("productName").trim();
    const quantity = Number(formData.get("quantity"));

    if (!name || !Number.isInteger(quantity) || quantity < 0) {
      setEditError("Enter a product name and a whole-number quantity of zero or more.");
      return;
    }

    onUpdate({ id, name, quantity });
    setEditingId(null);
    setEditError("");
  }

  return (
    <section
      aria-labelledby="products-heading"
      className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2
            id="products-heading"
            className="text-xl font-semibold tracking-tight text-slate-900"
          >
            Products inventory
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
        <table className="w-full min-w-[32rem] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                S/N
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Product name
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Quantity
              </th>
              <th scope="col" className="px-5 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">

            {products.length === 0 ? (
              <tr>
                <td
                  className="px-5 py-10 text-center text-sm text-slate-500"
                  colSpan={4}
                >
                  No products yet. Add a product above to get started.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product.id} className="text-slate-800 transition-colors hover:bg-slate-50/70">
                  <td className="px-5 py-4 tabular-nums text-slate-400">
                    {index + 1}
                  </td>
                  {editingId === product.id ? (
                    <>
                      <td className="px-5 py-4">
                        <form
                          id={`edit-product-${product.id}`}
                          onSubmit={(event) => handleEditSubmit(event, product.id)}
                        />
                        <label className="sr-only" htmlFor={`name-${product.id}`}>
                          Product name
                        </label>
                        <input
                          id={`name-${product.id}`}
                          form={`edit-product-${product.id}`}
                          name="productName"
                          type="text"
                          defaultValue={product.name}
                          maxLength={100}
                          required
                          className="min-w-40 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-emerald-600 focus:ring-emerald-600"
                        />
                        {editError && (
                          <p className="mt-2 text-xs text-rose-700" role="alert">
                            {editError}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4 tabular-nums">
                        <label
                          className="sr-only"
                          htmlFor={`quantity-${product.id}`}
                        >
                          Quantity
                        </label>
                        <input
                          id={`quantity-${product.id}`}
                          form={`edit-product-${product.id}`}
                          name="quantity"
                          type="number"
                          defaultValue={product.quantity}
                          min="0"
                          step="1"
                          required
                          className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-emerald-600 focus:ring-emerald-600"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-4 font-medium text-slate-900">{product.name}</td>
                      <td className="px-5 py-4 tabular-nums">
                        <span className="inline-flex min-w-10 justify-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          {product.quantity}
                        </span>
                      </td>
                    </>
                  )}
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex flex-wrap justify-end gap-2">
                      {editingId === product.id ? (
                        <>
                          <button
                            form={`edit-product-${product.id}`}
                            type="submit"
                            className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingId(null);
                              setEditError("");
                            }}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(product.id);
                            setEditError("");
                          }}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                          aria-label={`Edit ${product.name}`}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onDelete(product.id)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                        aria-label={`Delete ${product.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default Products