import { useState } from "react";
import "./App.css";
import { AppointmentForm } from "./components/AppointmentForm";
import { AppointmentsTable } from "./components/AppointmentsTable";
import TotalAppointmentsCard from "./components/TotalAppointmentsCard";
import { useAppointments } from "./hooks/useAppointments";
import { EditAppointmentForm } from "./components/EditAppointmentForm";
import type { Appointment } from "./types";

/**
 * Root component of the Appointment Booking System.
 * Handles layout, modal visibility, and appointment editing state.
 *
 * @returns {JSX.Element} The complete app UI with form, table, modal, and card.
 */
function App() {
  const { appointments } = useAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);

  /**
   * Triggers modal and sets the appointment to be edited.
   *
   * @param {Appointment} appt - The appointment to edit.
   */
  const handleEdit = (appt: Appointment) => {
    setEditingAppointment(appt);
    setIsModalOpen(true);
  };

  /**
   * Closes the modal and resets editing state.
   */
  const handleCloseModal = () => {
    setEditingAppointment(null);
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <TotalAppointmentsCard totalAppointments={appointments.length} />

        <div className="bottom-section">
          <div className="left-panel">
            <AppointmentForm />
          </div>
          <div className="right-panel">
            <AppointmentsTable onEdit={handleEdit} />
          </div>
        </div>
      </div>

      {isModalOpen && editingAppointment && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-icon" onClick={handleCloseModal}>
              ✖
            </button>
            <EditAppointmentForm
              appointment={editingAppointment}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
