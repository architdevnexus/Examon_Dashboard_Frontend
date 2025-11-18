import { useQuery } from "@tanstack/react-query";
import { GetData } from "../Handler/DashboardHandler.js";
export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: GetData,
  });
};
