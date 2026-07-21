'use client'
import { FilterCard } from "@/components/FilterCard"
import { ShopList } from "@/components/ShopList"
import { useShops } from "@/hooks/useShops"

export default function Page() {
  const { shops, loading, error } = useShops();

  return (
    <div className="max-w-4/6 m-auto p-4 flex flex-col">
      <div className="flex justify-center items-center mb-2">
        <h1 className="text-5xl p-4">Coffee Addicts</h1>
      </div>
      <div className="flex gap-4 w-full">
        <div>
          <FilterCard />
        </div>
        <div className="flex-1">
          <ShopList shops={shops} loading={loading} error={error} />
        </div>
      </div>
    </div>
  )
}
