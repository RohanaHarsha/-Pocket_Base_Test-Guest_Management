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

<<<<<<< HEAD
    // Fetch guest record from PocketBase
    pb.collection("guests").getOne(id).then((record) => {
      setGuest(record as unknown as Guest);
      setLoading(false);
    })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!guest) return;
    const { name, value } = e.target;
    setGuest({ ...guest, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 💡 IMPROVED CHECK: Ensure 'guest' exists AND 'guest.id' exists.
    if (!guest || !guest.id) {
      alert("Error: Guest data or ID is missing.");
      console.error("Guest or Guest ID is null/undefined at time of submit.");
      return;
    }

    try {
      // TypeScript is now 100% sure 'guest' is a non-null object with an 'id' property.
      await pb.collection("guests").update(guest.id, {
        first_name: guest.first_name,
        last_name: guest.last_name,
        address: guest.address,
        email: guest.email,
        date_of_birth: guest.date_of_birth,
      });
      alert("Guest updated successfully!");
      navigate("/GuestList");
    } catch (err) {
      console.error(err);
      alert("Failed to update guest.");
    }
  };

=======
    load();
  }, [id]);

>>>>>>> 7bf0d98db02ab021a683f241953a9f448e716528
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
