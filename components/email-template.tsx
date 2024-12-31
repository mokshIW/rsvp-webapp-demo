import * as React from "react";

interface RSVPEmailTemplateProps {
  name: string;
  email: string;
  accompany: string;
  attendance: string;
}

export const RSVPEmailTemplate: React.FC<Readonly<RSVPEmailTemplateProps>> = ({
  name,
  email,
  accompany,
  attendance,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f8ff",
      padding: "20px",
      maxWidth: "600px",
      margin: "auto",
      borderRadius: "12px",
      border: "1px solid #dbeafe",
    }}
    className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 rounded-xl shadow-lg border border-blue-200"
  >
    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-center mb-6">
      🎉 New RSVP Form Submission 🎉
    </h1>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-blue-800 text-lg mb-4">
        <strong className="font-semibold text-blue-900">Name:</strong> {name}
      </p>
      <p className="text-blue-800 text-lg mb-4">
        <strong className="font-semibold text-blue-900">Email:</strong> {email}
      </p>
      <p className="text-blue-800 text-lg mb-4">
        <strong className="font-semibold text-blue-900">
          Number of Guests:
        </strong>{" "}
        {accompany}
      </p>
      <p className="text-blue-800 text-lg mb-4">
        <strong className="font-semibold text-blue-900">Attendance:</strong>{" "}
        {attendance}
      </p>
    </div>
    <footer className="mt-6 text-center text-sm">
      <p className="text-blue-700">
        Thank you for your submission! We’re excited to have you 🎉
      </p>
      <p className="text-gray-500 mt-1">
        Please contact us if you have any questions.
      </p>
    </footer>
  </div>
);
