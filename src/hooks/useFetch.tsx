// @ts-nocheck
import { useEffect, useState } from "react";

const useFetch = (url: RequestInfo, options: RequestInit = {}, deps = []) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [abort, setAbort] = useState(() => {});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(abortController.abort);
        const res = await fetch(url, { ...options, signal });
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { response, loading, error, abort };
};

export { useFetch };
