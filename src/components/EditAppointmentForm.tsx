import React, { useEffect, useState } from "react";
import { useAppointments } from "../context/AppointmentContext";
import { doctors } from "../data/doctors";

interface Props {
  onClose: () => void;
}

export const EditAppointmentForm: React.FC<Props> = ({ onClose }) => {
  const { selectedAppointment, updateAppointment, getAvailableSlots } =
    useAppointments();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [slot, setSlot] = useState("");
  const [purpose, setPurpose] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedAppointment) {
      setName(selectedAppointment.name);
      setDate(selectedAppointment.date);
      setDoctorId(selectedAppointment.doctorId);
      setSlot(selectedAppointment.slot);
      setPurpose(selectedAppointment.purpose);
    }
  }, [selectedAppointment]);

  useEffect(() => {
    if (doctorId && date) {
      let slots = getAvailableSlots(doctorId, date);
      if (
        selectedAppointment?.slot &&
        selectedAppointment.doctorId === doctorId &&
        selectedAppointment.date === date
      ) {
        slots = [...slots, selectedAppointment.slot].sort();
      }
      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  }, [doctorId, date, selectedAppointment]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    const doctor = doctors.find((d) => d.id === doctorId);
    if (!doctor) return;

    const updatedAppointment = {
      ...selectedAppointment,
      name,
      date,
      doctorId,
      doctorName: doctor.name,
      slot,
      purpose,
    };

    updateAppointment(updatedAppointment);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Appointment</h3>
        <form onSubmit={handleUpdate} className="form-container">
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
              <option value="">-- Select Slot --</option>
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

          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
