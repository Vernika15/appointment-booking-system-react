import React, { createContext, useContext, useEffect, useState } from "react";
import type { Appointment } from "../types";
import { loadAppointments, saveAppointments } from "../utils/localStorage";
import { doctors } from "../data/doctors";

type AppointmentContextType = {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  getAvailableSlots: (doctorId: string, date: string) => string[];
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>(
    loadAppointments()
  );

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    setAppointments(loadAppointments());
  }, []);

  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

  const addAppointment = (appointment: Appointment) => {
    const updated = [...appointments, appointment];
    setAppointments(updated);
    saveAppointments(updated);
  };

  const updateAppointment = (updatedAppt: Appointment) => {
    const updated = appointments.map((a) =>
      a.id === updatedAppt.id ? updatedAppt : a
    );
    setAppointments(updated);
    saveAppointments(updated);
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    saveAppointments(updated);
  };

  const getAvailableSlots = (doctorId: string, date: string): string[] => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (!doctor) return [];

    const bookedSlots = appointments
      .filter((appt) => appt.doctorId === doctorId && appt.date === date)
      .map((appt) => appt.slot);

    return doctor.availableSlots.filter((slot) => !bookedSlots.includes(slot));
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        selectedAppointment,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        setSelectedAppointment,
        getAvailableSlots,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentProvider");
  }
  return context;
};
