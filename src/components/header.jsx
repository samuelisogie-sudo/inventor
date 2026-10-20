const Header = ({ products }) => {
  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <a href="/" className="flex items-center gap-3 text-slate-900">
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-700 text-lg font-bold text-white shadow-sm shadow-emerald-900/20">
            I
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight tracking-tight">
              Invento 
            </span>
            <span className="mt-1 block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Inventory
            </span>
          </span>
        </a>
        <div
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 sm:px-4"
          aria-label={`${products.length} products in inventory, ${totalQuantity} items in stock`}
        >
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="hidden text-slate-500 sm:inline">
            Items in stock
          </span>
          <span className="font-semibold tabular-nums text-slate-900">{totalQuantity}</span>
        </div>
      </div>
    </header>
  )
}

export default Header