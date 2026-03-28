export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-surface-base flex">
      {/* Sidebar skeleton */}
      <div className="hidden lg:flex w-64 flex-col border-r border-line bg-surface-card p-4 gap-4">
        {/* Logo */}
        <div className="h-8 w-32 rounded-lg bg-surface-elevated animate-pulse" />
        {/* Nav items */}
        <div className="space-y-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 rounded-lg bg-surface-elevated animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="h-14 border-b border-line bg-surface-card flex items-center px-6 gap-4">
          <div className="h-6 w-40 rounded-lg bg-surface-elevated animate-pulse" />
          <div className="ml-auto h-8 w-8 rounded-full bg-surface-elevated animate-pulse" />
        </div>

        {/* Content area */}
        <div className="flex-1 p-6">
          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-surface-card border border-line p-4 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="h-3 w-20 rounded bg-surface-elevated mb-3" />
                <div className="h-6 w-16 rounded bg-surface-elevated" />
              </div>
            ))}
          </div>

          {/* Table skeleton */}
          <div className="rounded-xl bg-surface-card border border-line overflow-hidden">
            {/* Header */}
            <div className="h-10 border-b border-line bg-surface-elevated flex items-center px-4 gap-6">
              {[80, 120, 100, 60, 80].map((w, i) => (
                <div key={i} className="h-3 rounded bg-surface-elevated animate-pulse" style={{ width: w, animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
            {/* Rows */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 border-b border-line flex items-center px-4 gap-6" style={{ animationDelay: `${i * 60}ms` }}>
                {[80, 120, 100, 60, 80].map((w, j) => (
                  <div key={j} className="h-3 rounded bg-surface-elevated animate-pulse" style={{ width: w }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
