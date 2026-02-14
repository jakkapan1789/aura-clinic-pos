"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../../components/AppLayout";
import api from "@/lib/api";
import axios from "axios";
import { MOCK_PATIENTS } from "@/mock/data";

const CreatePatientPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "Main",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const existing = MOCK_PATIENTS.find(
        (p) => p.phone === form.phone && p.branch === form.branch, // สมมติ branch = tenant
      );

      if (existing) {
        setError(
          "A patient with this phone number already exists in this branch.",
        );
        setLoading(false);
        return;
      }

      await api.post("/patients", form);
      router.push("/patients");
    } catch (err: unknown) {
      console.error("Create patient error:", err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;

          if (status >= 500) {
            setError("A server error occurred. Please try again later.");
          } else if (status === 404) {
            setError("The requested API endpoint was not found (404).");
          } else if (status === 400) {
            setError(
              err.response.data?.message ||
                "Invalid request. Please check your input and try again.",
            );
          } else if (status === 401) {
            setError("You are not authorized. Please log in again.");
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
        } else if (err.request) {
          setError(
            "Unable to connect to the server. Please check your network connection.",
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-lg">
        <h1 className="text-xl font-bold text-foreground">New Patient</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new patient record
        </p>

        {error && (
          <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
              className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Patient name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="patient@email.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Phone
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="555-0100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Branch
            </label>
            <select
              value={form.branch}
              onChange={(e) => update("branch", e.target.value)}
              className="w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              // className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Main">Main</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Saving…" : "Save Patient"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/patients")}
              disabled={loading}
              className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CreatePatientPage;
