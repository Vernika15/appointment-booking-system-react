import { useContext } from "react";
import { AppointmentContext } from "../context/AppointmentContext";
import type { AppointmentContextType } from "../types";

export const useAppointments = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentProvider");
  }
  return context;
};
