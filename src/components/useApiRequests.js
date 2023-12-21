import { useEffect } from "react";

const useApiRequests = (prompt) => {
  useEffect(() => {
    if (!prompt) return;
  }, [prompt]);
};
