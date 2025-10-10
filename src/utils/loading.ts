import { useState } from "react";

export function useLoading() {
    const [loading, setLoading] = useState(false)

    const withLoading = async (fn: () => Promise<unknown>) => {
        setLoading(true)
        try {
            return await fn()
        } finally {
            setLoading(false)
        }
    }

    return {loading, withLoading}
}