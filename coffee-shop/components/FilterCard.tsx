import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FilterCard() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label>X Coord</Label>
                            <Input
                                id="x-coord"
                                type="number"
                                step={0.01}
                                placeholder="0.00"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Y Coord</Label>
                            <Input
                                id="y-coord"
                                type="number"
                                step={0.01}
                                placeholder="0.00"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Shop Name</Label>
                            <Input
                                id="shop-name"
                                type="text"
                                placeholder="Shop Name"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
