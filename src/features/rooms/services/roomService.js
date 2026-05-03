import api from "@/core/interceptors/axiosInstance";

export const getRooms = () => api.get("/rooms");
export const createRoom = (data) => api.post("/rooms", data);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);