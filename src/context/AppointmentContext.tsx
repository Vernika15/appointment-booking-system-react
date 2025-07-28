import { createContext } from "react";
import type { AppointmentContextType } from "../types";

export const AppointmentContext = createContext<AppointmentContextType | null>(
  null
);
