import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Guest, GuestPayload } from "../server/Guest"; 
import { getGuestById, createGuest, updateGuest } from "../server/pocketbase";

export default function GuestRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Local form state
  const [form, setForm] = useState<Partial<Guest>>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
  });

  const [loading, setLoading] = useState(false); // fetching guest
  const [saving, setSaving] = useState(false); // saving form
  const [error, setError] = useState<string | null>(null);

  // Load existing guest when editing
  useEffect(() => {
    if (!id) return; // New guest
    setLoading(true);

    getGuestById(id)
      .then((guest) => {
        setForm({
          id: guest.id,
          first_name: guest.first_name || "",
          last_name: guest.last_name || "",
          email: guest.email || "",
          phone: guest.phone || "",
          address: guest.address || "",
          date_of_birth: guest.date_of_birth || "",
          created: guest.created || "",
          updated: guest.updated || "",
        });
      })
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, [id]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload: GuestPayload = {
        first_name: form.first_name || "",
        last_name: form.last_name || "",
        email: form.email || "",
        phone: form.phone || "",
        address: form.address || "",
        date_of_birth: form.date_of_birth || "",
      };

      if (id) {
        await updateGuest(id, payload); // update existing
      } else {
        await createGuest(payload); // create new
      }

      navigate("/GuestList");
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Guest" : "Add Guest"}
      </h2>

      {loading && <div>Loading guest...</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      {!loading && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-medium">First Name</label>
            <input
              name="first_name"
              value={form.first_name || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Last Name</label>
            <input
              name="last_name"
              value={form.last_name || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Phone</label>
            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="submit"
              disabled={saving}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/GuestList")}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}