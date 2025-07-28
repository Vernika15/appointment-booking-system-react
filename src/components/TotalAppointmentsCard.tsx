import React from "react";

interface Props {
  totalAppointments: number;
}

const TotalAppointmentsCard: React.FC<Props> = ({ totalAppointments }) => {
  return (
    <div className="top-card">
      <span>Total Appointments: {totalAppointments}</span>
    </div>
  );
};

export default TotalAppointmentsCard;
