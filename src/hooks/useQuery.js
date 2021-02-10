import { useLocation } from "@reach/router";

export const useQuery = queryParam => {
  const search = new URLSearchParams(useLocation().search);
  return search.get(queryParam);
};
