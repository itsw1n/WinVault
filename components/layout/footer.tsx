export function Footer() {
  return (
    <footer className="border-t-pv border-t-pv-border mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 flex items-center justify-between">
        <p className="text-xs text-pv-muted">
          © {new Date().getFullYear()} PlayVault. Games are hosted by their
          creators.
        </p>
        <p className="text-xs text-pv-muted">Discover indie games.</p>
      </div>
    </footer>
  )
}
