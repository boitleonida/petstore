import { PawPrint } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <PawPrint className="w-8 h-8 text-primary animate-bounce" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-foreground">Loading Texas Pet Hub...</h3>
          <p className="text-xs text-muted-foreground">Getting the latest pet listings ready for you</p>
        </div>
      </div>
    </div>
  )
}
