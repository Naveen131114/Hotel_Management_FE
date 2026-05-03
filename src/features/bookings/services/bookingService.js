import api from "@/core/interceptors/axiosInstance";

export const getBookings = () => api.get("/room-records");
export const createBooking = (data) =>
  api.post("/room-records", data);