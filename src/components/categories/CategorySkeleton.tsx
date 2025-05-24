import { Skeleton } from "@mui/material";

const CategorySkeleton = () => {
  return (
    <div className="flex items-center flex-shrink-0 bg-gray-100 p-4 rounded-2xl shadow-sm w-[clamp(12rem,40vw,18rem)]">
      <div className="flex flex-col space-y-3 w-2/3">
        <Skeleton variant="text" width="80%" height={25} />
        <Skeleton variant="rounded" width="70%" height={35} />
      </div>
      <Skeleton
        variant="circular"
        width={72}
        height={72}
        className="rounded-full ml-auto"
      />
    </div>
  );
};

export default CategorySkeleton;
