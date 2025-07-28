import React, { useEffect, useState } from "react";
import { useAppointments } from "../context/AppointmentContext";
import { doctors } from "../data/doctors";
import { generateId } from "../utils/id";

export const AppointmentForm: React.FC = () => {
  const {
    addAppointment,
    updateAppointment,
    selectedAppointment,
    setSelectedAppointment,
    getAvailableSlots,
  } = useAppointments();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [slot, setSlot] = useState("");
  const [purpose, setPurpose] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    if (doctorId && date) {
      const slots = getAvailableSlots(doctorId, date);

      // When editing, include the old slot back in available list
      if (
        selectedAppointment?.slot &&
        selectedAppointment.doctorId === doctorId &&
        selectedAppointment.date === date
      ) {
        slots.push(selectedAppointment.slot);
        slots.sort();
      }

      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  }, [doctorId, date, selectedAppointment]);

  useEffect(() => {
    if (selectedAppointment) {
      setName(selectedAppointment.name);
      setDate(selectedAppointment.date);
      setDoctorId(selectedAppointment.doctorId);
      setSlot(selectedAppointment.slot);
      setPurpose(selectedAppointment.purpose);
    }
  }, [selectedAppointment]);

  const resetForm = () => {
    setName("");
    setDate("");
    setDoctorId("");
    setSlot("");
    setPurpose("");
    setAvailableSlots([]);
    setSelectedAppointment(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const doctor = doctors.find((d) => d.id === doctorId);
    if (!doctor) return;

    const appointment = {
      id: selectedAppointment ? selectedAppointment.id : generateId(),
      name,
      date,
      doctorId,
      doctorName: doctor.name,
      slot,
      purpose,
    };

    selectedAppointment
      ? updateAppointment(appointment)
      : addAppointment(appointment);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>📝 Appointment Form</h3>

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

      <button type="submit">
        {selectedAppointment ? "Update Appointment" : "Book Appointment"}
      </button>
    </form>
  );
};
