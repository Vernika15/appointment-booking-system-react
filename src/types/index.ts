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
