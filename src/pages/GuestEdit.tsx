import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PocketBase from "pocketbase";
import type { Guest } from "../server/Guest.ts";

const pb = new PocketBase("http://127.0.0.1:8090"); // Replace with your PocketBase URL

const GuestEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

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

  if (loading) return <div>Loading...</div>;
  if (!guest) return <div>Guest not found</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Edit Guest</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="name"
            value={guest.first_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="name"
            value={guest.last_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={guest.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={guest.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={guest.date_of_birth}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate("/GuestList")}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestEdit;
