import { Skeleton } from "@/components/ui/skeleton"

export function ArtistSkeleton() {
  return (
    <div className="w-34 flex flex-col items-center gap-4">
      <Skeleton className="h-34 w-34 rounded-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}
