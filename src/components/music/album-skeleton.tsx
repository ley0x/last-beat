import { Skeleton } from "@/components/ui/skeleton"

export function AlbumSkeleton() {
  return (
    <div className="w-42 flex flex-col items-center gap-4">
      <Skeleton className="h-32 w-32 rounded-sm shadow" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}
