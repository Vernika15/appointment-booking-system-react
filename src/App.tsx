import "./App.css";
import { AppointmentForm } from "./components/AppointmentForm";
import { AppointmentsTable } from "./components/AppointmentsTable";
import TotalAppointmentsCard from "./components/TotalAppointmentsCard";
import { useAppointments } from "./context/AppointmentContext";

function App() {
  const { appointments } = useAppointments();

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* <div className="top-card">
          <span>Total Appointments: 0</span>
        </div> */}

        <TotalAppointmentsCard totalAppointments={appointments.length} />

        <div className="bottom-section">
          <div className="left-panel">
            <AppointmentForm />
          </div>
          <div className="right-panel">
            <AppointmentsTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
