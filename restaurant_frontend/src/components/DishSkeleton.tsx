import { Skeleton } from "./ui/Skeleton";

const DishSkeleton = () => {
  return (
    <>
      <div className="border flex flex-col justify-center gap-5 items-center max-w-xs m-2 overflow-hidden group">
        <Skeleton className="w-72 h-60" />

        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <div className="flex justify-between gap-5 p-2 m-2 items-center">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </>
  );
};

export default DishSkeleton;
