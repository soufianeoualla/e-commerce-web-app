import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="flex flex-col space-y-3 mr-8">
      <Skeleton className="h-[312px] w-[237px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[176px]" />
        <Skeleton className="h-5 w-[140px]" />
      </div>
    </div>
  );
}
