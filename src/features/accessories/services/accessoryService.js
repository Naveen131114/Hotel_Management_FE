import api from "@/core/interceptors/axiosInstance";

export const getAccessories = () => api.get("/accessories");
export const createAccessory = (data) => api.post("/accessories", data);
export const updateAccessory = (id, data) => api.put(`/accessories/${id}`, data);
export const deleteAccessory = (id) => api.delete(`/accessories/${id}`);
