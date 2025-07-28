import type { Appointment } from "../types";

const STORAGE_KEY = "appointments";

export const loadAppointments = (): Appointment[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveAppointments = (appointments: Appointment[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};
