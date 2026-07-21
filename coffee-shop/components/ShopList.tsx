import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Shop } from "@/types"
import { Skeleton } from "./ui/skeleton"

interface ShopListProps {
    shops: Shop[],
    loading: boolean,
    error: string | null
}

export function ShopList({ shops, loading, error }: ShopListProps) {

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Shops</CardTitle>
            </CardHeader>
            <CardContent>
                {loading && (<div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index}>
                            <CardHeader className="space-y-2">
                                <Skeleton className="h-4 w-56" />
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Skeleton className="h-4 w-40" />
                            </CardContent>
                        </Card>
                    ))}
                </div>)}

                {error && <span className="text-red-500 text-sm">{error}</span>}

                {!error && !loading && shops.length === 0 ? (<span className="text-muted-foreground">No Shops Found.</span>) :
                    shops.map((shop: Shop, index: number) => {
                        const isTop3 = index < 3
                        return (
                            <Card key={shop?.id} className={`mb-4 ${isTop3 && shop.distance ? 'border-gray-300 border-2' : ''}`} >
                                <CardHeader>
                                    <CardTitle className="flex justify-between">
                                        <div>
                                            {shop?.name}
                                        </div>
                                        {isTop3 && shop.distance && <div className="text-gray-300">
                                            Nearest
                                        </div>}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-1">
                                        <span>{shop?.x}, {shop?.y}</span>
                                        <span>Distance: {shop?.distance ? shop?.distance.toFixed(3) : 'TBD'}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
            </CardContent>
        </Card>
    )
}
