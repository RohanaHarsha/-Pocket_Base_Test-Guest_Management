import PocketBase from "pocketbase";
import type { Guest } from "../server/Guest.ts";

const PB_URL = import.meta.env.VITE_PB_URL || "http://127.0.0.1:8090";
export const pb = new PocketBase(PB_URL);

export const initAuth = async () => {
  try {
    await pb.admins.authWithPassword("test@gmail.com", "12345678");
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
};

// Call auth on module load
initAuth().catch(console.error);


// this script will be auto generated according to your preferef languae by pocketbase
// CRUD helpers
export const getGuests = async (): Promise<Guest[]> => {
  const records = await pb.collection("guests").getFullList({
    sort: "-id",
  });
  return records as unknown as Guest[];
};

export const getGuestById = async (id: string): Promise<Guest> => {
  const res = await pb.collection("guests").getOne(id);
  return res as unknown as Guest;
};

export const createGuest = async (guest: Guest) => {
  await pb.collection("guests").create(guest);
};

export const updateGuest = async (id: string, guest: Guest) => {
  await pb.collection("guests").update(id, guest);
};

export const deleteGuest = async (id: string) => {
  await pb.collection("guests").delete(id);
};
