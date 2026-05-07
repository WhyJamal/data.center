import api from "@/lib/axiosInstance-1c";

export const getData = async <T = any>(endpoint: string): Promise<T> => {
  const res = await api.get(endpoint);
  return res.data;
};

export const postData = async <T = any>(
  endpoint: string,
  data: any
): Promise<{ data: T; status: number }> => {
  const res = await api.post(endpoint, data);
  return { data: res.data, status: res.status };
};

export const putData = async <T = any>(
  endpoint: string,
  data: any
): Promise<T> => {
  const res = await api.put(endpoint, data);
  return res.data;
};

export const deleteData = async <T = any>(
  endpoint: string
): Promise<T> => {
  const res = await api.delete(endpoint);
  return res.data;
};