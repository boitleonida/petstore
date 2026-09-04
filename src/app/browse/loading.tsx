export default function BrowseLoading() {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-background rounded-2xl border p-5 shadow-sm space-y-6">
            <div className="h-6 w-24 bg-muted animate-pulse rounded" />
            <div className="h-10 w-full bg-muted/60 animate-pulse rounded-xl" />
            <div className="space-y-3 pt-3 border-t">
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              <div className="space-y-2">
                <div className="h-8 w-full bg-muted/40 animate-pulse rounded-lg" />
                <div className="h-8 w-full bg-muted/40 animate-pulse rounded-lg" />
                <div className="h-8 w-full bg-muted/40 animate-pulse rounded-lg" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Grid Skeleton */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-muted animate-pulse rounded-lg" />
              <div className="h-4 w-32 bg-muted/60 animate-pulse rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-20 bg-muted animate-pulse rounded-full" />
              <div className="h-8 w-20 bg-muted animate-pulse rounded-full" />
              <div className="h-8 w-20 bg-muted animate-pulse rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-background rounded-2xl border overflow-hidden shadow-sm flex flex-col">
                <div className="h-60 w-full bg-muted animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-muted/60 animate-pulse rounded" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-5 w-16 bg-muted/50 animate-pulse rounded" />
                    <div className="h-5 w-20 bg-muted/50 animate-pulse rounded" />
                  </div>
                  <div className="pt-4 border-t">
                    <div className="h-9 w-full bg-muted animate-pulse rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
