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

interface FilterCardProps {
    searchName: string
    xCoord: number | null,
    yCoord: number | null,
    setSearchName: (val: string) => void
    setXCoord: (val: number | null) => void
    setYCoord: (val: number | null) => void
}

export function FilterCard({ searchName, setSearchName, xCoord, yCoord, setXCoord, setYCoord }: FilterCardProps) {
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
                                step={0.001}
                                placeholder="0.000"
                                value={xCoord ?? ""}
                                onChange={(e) => setXCoord(e.target.value ? Number(e.target.value) : null)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Y Coord</Label>
                            <Input
                                id="y-coord"
                                type="number"
                                step={0.001}
                                placeholder="0.000"
                                value={yCoord ?? ""}
                                onChange={(e) => setYCoord(e.target.value ? Number(e.target.value) : null)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Shop Name</Label>
                            <Input
                                id="shop-name"
                                type="text"
                                placeholder="Shop Name"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
