import { ShopList } from "@/components/ShopList"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="max-w-4/6 m-auto p-4 flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-5xl p-4">Coffee Addicts</h1>
      </div>
      <div className="flex">
        <div>Filter</div>
        <div className="flex-1">
          <ShopList />
        </div>
      </div>
    </div>
  )
}
