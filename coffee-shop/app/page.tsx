'use client'
import { FilterCard } from "@/components/FilterCard"
import { ShopList } from "@/components/ShopList"
import { useFilters } from "@/hooks/useFilters";
import { useShops } from "@/hooks/useShops"

export default function Page() {
  const { shops, loading, error } = useShops();
  const { filteredShops, searchName, setSearchName, xCoord, yCoord, setXCoord, setYCoord } = useFilters(shops)

  return (
    <div className="max-w-4/6 m-auto p-4 flex flex-col">
      <div className="flex justify-center items-center mb-2">
        <h1 className="text-5xl p-4">Coffee Addicts</h1>
      </div>
      <div className="flex gap-4 w-full">
        <div>
          <FilterCard searchName={searchName} setSearchName={setSearchName} xCoord={xCoord} yCoord={yCoord} setXCoord={setXCoord} setYCoord={setYCoord} />
        </div>
        <div className="flex-1">
          <ShopList shops={filteredShops} loading={loading} error={error} />
        </div>
      </div>
    </div>
  )
}
