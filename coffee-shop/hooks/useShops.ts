'use client'
import { API_BASE_URL } from "@/config/apiConfig";
import { apiFetch } from "@/interceptors/shopsInterceptor";
import { Shop } from "@/types";
import { useCallback, useEffect, useState } from "react"

const COFFEE_SHOPS_API_URL = `${API_BASE_URL}/coffee_shops`

export const useShops = () => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchShops = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiFetch(COFFEE_SHOPS_API_URL)
            if (!response || !response.ok) {
                setError("Error fetching shops")
                return
            }

            const data: Shop[] = await response?.json();
            setShops(data)

        } catch (err) {
            console.error("Failed to fetch coffee shops:", err);
            setError("We could not load the shops.");
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => { fetchShops() }, [fetchShops])

    return { shops, loading, error }
}