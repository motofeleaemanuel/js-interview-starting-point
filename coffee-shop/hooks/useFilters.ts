'use client'
import { calculateEuclideanDistance } from "@/lib/utils";
import { Shop } from "@/types";
import { useMemo, useState } from "react";

export const useFilters = (shops: Shop[]) => {
    const [searchName, setSearchName] = useState<string>("");
    const [xCoord, setXCoord] = useState<number | null>(null);
    const [yCoord, setYCoord] = useState<number | null>(null);

    const filteredShops = useMemo(() => {
        const filteredByNameShops = shops.filter((shop: Shop) => {
            return shop.name.toLowerCase().includes(searchName.toLowerCase())
        })

        if (xCoord == null || yCoord == null) {
            return filteredByNameShops
        }

        return filteredByNameShops.map((shop: Shop) => {
            if (shop.x == null || shop.y == null) {
                return shop
            }
            return {
                ...shop,
                distance: calculateEuclideanDistance(
                    xCoord,
                    yCoord,
                    shop.x,
                    shop.y)
            }
        }).toSorted((a, b) => {
            if (a.distance == null && b.distance == null) return 0;
            if (a.distance == null) return 1;
            if (b.distance == null) return -1;
            return a.distance - b.distance;
        })


    }, [shops, searchName, xCoord, yCoord])

    return { filteredShops, searchName, setSearchName, xCoord, yCoord, setXCoord, setYCoord }
}