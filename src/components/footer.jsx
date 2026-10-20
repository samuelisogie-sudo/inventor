const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-semibold tracking-tight text-emerald-800">Invento</p>
        <p className="text-slate-500">
          A simpler way to stay on top of your stock.
        </p>
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Invento. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer