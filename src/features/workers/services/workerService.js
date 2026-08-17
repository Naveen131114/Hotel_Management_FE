import api from "@/core/interceptors/axiosInstance";

export const getWorkers = () => api.get("/workers");
export const createWorker = (data) => api.post("/workers", data);
export const updateWorker = (id, data) => api.put(`/workers/${id}`, data);
export const deleteWorker = (id) => api.delete(`/workers/${id}`);
