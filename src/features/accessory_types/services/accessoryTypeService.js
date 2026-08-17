import api from "@/core/interceptors/axiosInstance";

export const getAccessoryTypes = () => api.get("/accessory-types");
export const createAccessoryType = (data) => api.post("/accessory-types", data);
export const updateAccessoryType = (id, data) => api.put(`/accessory-types/${id}`, data);
export const deleteAccessoryType = (id) => api.delete(`/accessory-types/${id}`);
