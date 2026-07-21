'use client'
import { FilterCard } from "@/components/FilterCard"
import { ShopList } from "@/components/ShopList"
import { useFilters } from "@/hooks/useFilters";
import { useShops } from "@/hooks/useShops"

export default function Page() {
  const { shops, loading, error } = useShops();
  const { filteredShops, searchName, setSearchName, xCoord, yCoord, setXCoord, setYCoord } = useFilters(shops)

  return (
    <div className="lg:max-w-3/4 w-full sm:max-w-4/5 m-auto p-4 flex flex-col">
      <div className="flex justify-center items-center mb-2">
        <h1 className="text-3xl lg:text-5xl p-4 text-center">Coffee Addicts</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="w-full lg:w-auto">
          <FilterCard searchName={searchName} setSearchName={setSearchName} xCoord={xCoord} yCoord={yCoord} setXCoord={setXCoord} setYCoord={setYCoord} />
        </div>
        <div className="flex-1">
          <ShopList shops={filteredShops} loading={loading} error={error} />
        </div>
      </div>
    </div>
  )
}
