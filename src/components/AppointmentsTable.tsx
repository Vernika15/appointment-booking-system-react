import React from "react";
import { useAppointments } from "../context/AppointmentContext";

export const AppointmentsTable: React.FC = () => {
  const { appointments, deleteAppointment, setSelectedAppointment } =
    useAppointments();

  return (
    <div className="table-container">
      <h3>📅 Appointments Table</h3>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Purpose</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.name}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.date}</td>
                <td>{appt.slot}</td>
                <td>{appt.purpose}</td>
                <td>
                  <button
                    className="edit-btn"
                    // onClick={() => setSelectedAppointment(appt)}
                    onClick={() =>
                      alert(
                        `Edit clicked for:\nName: ${appt.name}\nDoctor: ${appt.doctorName}\nDate: ${appt.date}\nSlot: ${appt.slot}\nPurpose: ${appt.purpose}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to cancel this appointment?"
                        )
                      ) {
                        deleteAppointment(appt.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
