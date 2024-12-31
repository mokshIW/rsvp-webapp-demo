"use server";
import { createClient } from "../utils/supabase/server";
import { Resend } from "resend";
import { RSVPEmailTemplate } from "@/components/email-template";
import { strings } from "../utils/strings";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitRSVP(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name");
  const email = formData.get("email");
  const accompany = formData.get("accompany");
  const attendance = formData.get("attendance");

  const { data, error } = await supabase.from("rsvps").insert([
    {
      name,
      email,
      accompany,
      attendance,
    },
  ]);

  console.log(data, "data_submitRSVP");

  if (error) {
    console.error("Error inserting RSVP", error);
    return { success: false, message: "Failed to submit RSVP", error };
  }

  if (!strings.sendToEmail) {
    console.error("No email to send to");
    return { success: false, message: "No email to send to" };
  }

  // Send email
  try {
    await resend.emails.send({
      from: "RSVP <onboarding@resend.dev>",
      to: strings.sendToEmail,
      subject: "New RSVP Form Submission",
      react: await RSVPEmailTemplate({
        name: `${name}`,
        email: `${email}`,
        accompany: `${accompany}`,
        attendance: `${attendance}`,
      }),
    });
  } catch (error) {
    console.error("Error sending email", error);
    return { success: false, message: "Failed to send email", error };
  }

  return { success: true, message: "RSVP submitted successfully!" };
}
