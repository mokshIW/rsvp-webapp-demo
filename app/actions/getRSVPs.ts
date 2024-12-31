"use server";

import { createClient } from "../utils/supabase/server";

export async function getRSVPs() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("rsvps").select("*");

  if (error) {
    console.error("Error fetching rsvps", error);
    return { success: false, message: "Failed to fetch RSVPs" };
  }

  //   console.log("RSVPs", data);
  return { success: true, data };
}
