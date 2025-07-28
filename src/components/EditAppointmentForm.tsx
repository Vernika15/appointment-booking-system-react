import React, { useEffect, useState } from "react";
import { useAppointments } from "../hooks/useAppointments";
import { doctors } from "../data/doctors";
import type { Appointment } from "../types";

type Props = {
  appointment: Appointment;
  onClose: () => void;
};

export const EditAppointmentForm: React.FC<Props> = ({
  appointment,
  onClose,
}) => {
  const { updateAppointment, getAvailableSlots } = useAppointments();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [slot, setSlot] = useState("");
  const [purpose, setPurpose] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    if (appointment) {
      setName(appointment.name);
      setDate(appointment.date);
      setDoctorId(appointment.doctorId);
      setSlot(appointment.slot);
      setPurpose(appointment.purpose);
    }
  }, [appointment]);

  useEffect(() => {
    if (doctorId && date) {
      const slots = getAvailableSlots(doctorId, date);

      // Include current slot in list while editing
      if (
        appointment?.slot &&
        appointment.doctorId === doctorId &&
        appointment.date === date
      ) {
        slots.push(appointment.slot);
        slots.sort();
      }

      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  }, [doctorId, date, appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment) return;

    const doctor = doctors.find((d) => d.id === doctorId);
    if (!doctor) return;

    const updated = {
      ...appointment,
      name,
      date,
      doctorId,
      doctorName: doctor.name,
      slot,
      purpose,
    };

    updateAppointment(updated);
    onClose(); // close modal after update
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>✏️ Edit Appointment</h3>

      <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <label>
        Doctor:
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Slot:
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
          disabled={!doctorId || !date}
        >
          <option value="">-- Select Doctor & Date First --</option>
          {availableSlots.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label>
        Purpose:
        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
        />
      </label>

      <button type="submit">Update Appointment</button>
    </form>
  );
};
