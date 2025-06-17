import { Skeleton } from "@/components/ui/skeleton"

export function AlbumSkeleton() {
  return (
    <div className="w-34 flex flex-col items-center gap-4">
      <Skeleton className="h-34 w-34 rounded-sm shadow bg-muted" />
      <Skeleton className="h-4 w-full bg-muted" />
    </div>
  )
}
