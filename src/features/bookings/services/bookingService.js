import api from "@/core/interceptors/axiosInstance";

export const getBookings = () => api.get("/room-records");
export const createBooking = (data) =>
  api.post("/room-records", data);
export const updateBooking = (id, data) => api.put(`/room-records/${id}`, data);
export const deleteBooking = (id) => api.delete(`/room-records/${id}`);
