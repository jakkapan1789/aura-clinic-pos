import { useState } from "react";
import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { MOCK_PATIENTS } from "@/mock/data";

const BRANCHES = ["All", "Main", "North", "South"];

const PatientsPage = () => {
  const { can } = useAuth();
  const [branchFilter, setBranchFilter] = useState("All");

  const filtered =
    branchFilter === "All"
      ? MOCK_PATIENTS
      : MOCK_PATIENTS.filter((p) => p.branch === branchFilter);

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Patients</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} records
          </p>
        </div>

        {can("create_patient") && (
          <Link
            href="/patients/create"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Patient
          </Link>
        )}
      </div>

      {/* Branch filter */}
      <div className="mt-4 flex gap-1.5">
        {BRANCHES.map((b) => (
          <button
            key={b}
            onClick={() => setBranchFilter(b)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              branchFilter === b
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Name
              </th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">
                Email
              </th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Branch
              </th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {p.name}
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {p.email}
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                  {p.phone}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {p.branch}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                  {p.createdAt}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default PatientsPage;
