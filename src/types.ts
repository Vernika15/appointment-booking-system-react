export type Doctor = {
  id: string;
  name: string;
  availableSlots: string[];
};

export type Appointment = {
  id: string;
  name: string;
  doctorId: string;
  doctorName: string;
  date: string;
  slot: string;
  purpose: string;
};

export type AppointmentContextType = {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  getAvailableSlots: (doctorId: string, date: string) => string[];
};
