import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 border p-3 rounded">
      <Skeleton className="h-[150px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 " />
        <div className="flex space-x-2 justify-between">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />

        </div>
      </div>
    </div>
  )
}