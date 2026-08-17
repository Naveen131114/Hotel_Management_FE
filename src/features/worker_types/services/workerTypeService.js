import api from "@/core/interceptors/axiosInstance";

export const getWorkerTypes = () => api.get("/worker-types");
export const createWorkerType = (data) => api.post("/worker-types", data);
export const updateWorkerType = (id, data) => api.put(`/worker-types/${id}`, data);
export const deleteWorkerType = (id) => api.delete(`/worker-types/${id}`);
