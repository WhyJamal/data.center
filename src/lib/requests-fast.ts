import apiFast from "@/lib/axiosInstance-fast";

export const getFastData = async <T = any>(endpoint: string): Promise<T> => {
  const res = await apiFast.get(endpoint);
  return res.data;
};