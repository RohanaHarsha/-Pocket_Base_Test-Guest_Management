import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import type { Guest, GuestPayload } from "../server/Guest";

const pb = new PocketBase("http://127.0.0.1:8090");

type Props = {
  id: string;
};

export default function GuestEdit({ id }: Props) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);

  // Load guest on mount
  useEffect(() => {
    const load = async () => {
      const record = await pb.collection("guests").getOne(id);
      setGuest(record as unknown as Guest);
      setLoading(false);
    };

    load();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!guest) return <div>Guest not found</div>;

  // Handle input changes safely
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setGuest((prev: any) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev
    );
  };

  // Submit updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build a proper GuestPayload
    const payload: GuestPayload = {
      first_name: guest.first_name,
      last_name: guest.last_name,
      email: guest.email,
      phone: guest.phone,
      address: guest.address,
      date_of_birth: guest.date_of_birth,
    };

    await pb.collection("guests").update(guest.id!, payload);

    alert("Updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First name:
        <input
          name="first_name"
          value={guest.first_name}
          onChange={handleChange}
        />
      </label>

      <label>
        Last name:
        <input
          name="last_name"
          value={guest.last_name}
          onChange={handleChange}
        />
      </label>

      <label>
        Email:
        <input
          name="email"
          value={guest.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Phone:
        <input
          name="phone"
          value={guest.phone ?? ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Address:
        <input
          name="address"
          value={guest.address ?? ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Date of birth:
        <input
          name="date_of_birth"
          type="date"
          value={guest.date_of_birth?.substring(0, 10) ?? ""}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
