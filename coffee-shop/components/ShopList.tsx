import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const MOCK_SHOPS = [
    {
        name: "Shop 1",
        x: 46.01,
        y: 12.64
    },
    {
        name: "Shop 2",
        x: 55.01,
        y: 12.64
    }, {
        name: "Shop 3",
        x: 47.01,
        y: 12.64
    }, {
        name: "Shop 4",
        x: 49.01,
        y: 12.64
    }
]

export function ShopList() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Shops</CardTitle>
            </CardHeader>
            <CardContent>
                {MOCK_SHOPS.map((shop) => {
                    return (<Card className="mb-4">
                        <CardHeader>
                            <CardTitle>
                                {shop?.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span>{shop?.x}, {shop?.y} Distance</span>
                        </CardContent>
                    </Card>)
                })}
            </CardContent>

        </Card>
    )
}
