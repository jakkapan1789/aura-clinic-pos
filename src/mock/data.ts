export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  createdAt: string;
}

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "555-0101",
    branch: "Main",
    createdAt: "2026-02-10",
  },
  {
    id: "2",
    name: "John Rivera",
    email: "john@email.com",
    phone: "555-0102",
    branch: "North",
    createdAt: "2026-02-11",
  },
  {
    id: "3",
    name: "Ana Cruz",
    email: "ana@email.com",
    phone: "555-0103",
    branch: "Main",
    createdAt: "2026-02-12",
  },
  {
    id: "4",
    name: "Carlos Reyes",
    email: "carlos@email.com",
    phone: "555-0104",
    branch: "South",
    createdAt: "2026-02-13",
  },
  {
    id: "5",
    name: "Lisa Park",
    email: "lisa@email.com",
    phone: "555-0105",
    branch: "North",
    createdAt: "2026-02-14",
  },
];
