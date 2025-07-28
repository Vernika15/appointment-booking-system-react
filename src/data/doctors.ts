import type { Doctor } from "../types";

export const ALL_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. A.P.J. Abdul",
    availableSlots: [...ALL_SLOTS],
  },
  {
    id: "2",
    name: "Dr. Maya Rao",
    availableSlots: [...ALL_SLOTS],
  },
  {
    id: "3",
    name: "Dr. Vikram Patel",
    availableSlots: [...ALL_SLOTS],
  },
  {
    id: "4",
    name: "Dr. In Ho",
    availableSlots: [...ALL_SLOTS],
  },
  {
    id: "5",
    name: "Dr. Deepak Verma",
    availableSlots: [...ALL_SLOTS],
  },
  {
    id: "6",
    name: "Dr. Prem Chand",
    availableSlots: [...ALL_SLOTS],
  },
];
