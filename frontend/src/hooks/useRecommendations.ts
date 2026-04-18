import { useEffect, useState } from "react";
import { getRecommendations, type RecommendationQuery } from "@/services/recommendationService";
import type { Stay } from "@/data/mockStays";

type RecMeta = {
  personalized?: boolean;
  engine?: string;
};

export function useRecommendations(params: RecommendationQuery = {}) {
  const [items, setItems] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<RecMeta>({});

  const city = params.city ?? "";
  const guests = params.guests ?? "";
  const minBudget = params.minBudget ?? "";
  const maxBudget = params.maxBudget ?? "";
  const limit = params.limit ?? 8;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    getRecommendations({ city, guests, minBudget, maxBudget, limit })
      .then((res) => {
        if (cancelled) return;
        const payload = res.data;
        setItems(Array.isArray(payload?.data) ? payload.data : []);
        setMeta(payload?.meta ?? {});
      })
      .catch(() => {
        if (!cancelled) setError("Could not load recommendations.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [city, guests, minBudget, maxBudget, limit]);

  return { items, loading, error, meta };
}
