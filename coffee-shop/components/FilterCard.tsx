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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { InfoIcon } from "lucide-react"

const SEARCH_INPUT_MAX_LENGTH = 50
const LATITUDE_MIN = -90
const LATITUDE_MAX = 90
const LONGITUDE_MIN = -180
const LONGITUDE_MAX = 180

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
                            <Label>X Coord
                                <Tooltip>
                                    <TooltipTrigger render={<InfoIcon size={18} />} />
                                    <TooltipContent>
                                        <p>X coord is min -90 and max 90</p>
                                    </TooltipContent></Tooltip>
                            </Label>
                            <Input
                                id="x-coord"
                                type="number"
                                step={0.001}
                                min={LATITUDE_MIN}
                                max={LATITUDE_MAX}
                                placeholder="0.000"
                                value={xCoord ?? ""}
                                onChange={(e) => setXCoord(e.target.value ? Number(e.target.value) : null)}
                                onBlur={(e) => {
                                    if (!e.target.value) return;
                                    const clamped = Math.max(LATITUDE_MIN, Math.min(LATITUDE_MAX, Number(e.target.value)));
                                    setXCoord(clamped);
                                    e.target.value = String(clamped);
                                }}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Y Coord
                                <Tooltip>
                                    <TooltipTrigger render={<InfoIcon size={18} />} />
                                    <TooltipContent>
                                        <p>Y coord is min -180 and max 180</p>
                                    </TooltipContent></Tooltip>
                            </Label>
                            <Input
                                id="y-coord"
                                type="number"
                                step={0.001}
                                min={LONGITUDE_MIN}
                                max={LONGITUDE_MAX}
                                placeholder="0.000"
                                value={yCoord ?? ""}
                                onChange={(e) => setYCoord(e.target.value ? Number(e.target.value) : null)}
                                onBlur={(e) => {
                                    if (!e.target.value) return;
                                    const clamped = Math.max(LONGITUDE_MIN, Math.min(LONGITUDE_MAX, Number(e.target.value)));
                                    setYCoord(clamped);
                                    e.target.value = String(clamped);
                                }}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Shop Name</Label>
                            <Input
                                id="shop-name"
                                type="text"
                                placeholder="Shop Name"
                                maxLength={SEARCH_INPUT_MAX_LENGTH}
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
