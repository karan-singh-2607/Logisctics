import { NOT_FOUND } from "@/public";

export function EmptyState() {
    return (
      <div className="flex flex-col items-center justify-center py-12">
      <NOT_FOUND />
        <h3 className="text-md mt-6 font-medium text-gray-900">No package found</h3>
      </div>
    )
  }
  
  