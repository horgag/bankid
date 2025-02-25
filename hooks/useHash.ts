import { useCallback, useEffect, useState } from "react";

export interface HashParams {
  [key: string]: string | undefined | boolean;
  initiated?: string;
}

const getHashParams = (hash: string): HashParams => {
  if (!hash) {
    return {};
  }

  const params = new URLSearchParams(hash.substring(1));

  return [...params.entries()].reduce(
    (acc, curr) => ({
      ...acc,
      [curr[0]]: curr[1],
    }),
    {}
  ) as HashParams;
};

const useHash = () => {
  const [hash, setHash] = useState<string>(
    typeof window !== "undefined" ? window.location.hash : ""
  );

  const hashChangeHandler = useCallback(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", hashChangeHandler);

      return () => {
        window.removeEventListener("hashchange", hashChangeHandler);
      };
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hashParam: HashParams = getHashParams(hash);

  return {
    hash,
    hashParam,
  };
};

export default useHash;

