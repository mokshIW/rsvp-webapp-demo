"use client";
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { strings } from "../utils/strings";
import { submitRSVP } from "../actions/submitRSVP";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accompany, setAccompany] = useState<string | null>(null);
  const [attendance, setAttendance] = useState("yes");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("accompany", accompany || "0");
    formData.append("attendance", attendance);

    console.log("formData", formData);

    setIsLoading(true);
    const response = await submitRSVP(formData);

    if (response.success) {
      toast({
        title: "Success!",
        description: strings.thankYouMessage,
      });
      // Reset Form
      setName("");
      setEmail("");
      setAccompany(null);
      setAttendance("yes");
      setErrors({});
    } else {
      toast({
        title: "Error!",
        description: response.message,
        variant: "destructive",
      });

      // TODO: Check if email is already submitted
    }

    setIsLoading(false);
  };

  const openGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(strings.eventLocation);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
    );
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-3xl font-bold mb-4">{strings.title}</h1>
      <p className="mb-6">{strings.description}</p>

      <div className="mb-6">
        <Label>{strings.eventDateLabel}</Label>
        {/* <p>{new Date(strings.eventDate).toLocaleDateString()}</p> */}
        <Calendar
          mode="single"
          selected={new Date(strings.eventDate)}
          className="rounded-md border flex flex-col items-center"
          fromDate={new Date(strings.eventDate)}
          toDate={new Date(strings.eventDate)}
          defaultMonth={new Date(strings.eventDate)}
          ISOWeek
        />

        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={openGoogleMaps}
          >
            <MapPin />
            {strings.viewOnMapButton}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">{strings.nameLabel}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">{strings.emailLabel}</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="accompany">{strings.accompanyLabel}</Label>
          <Input
            id="accompany"
            type="number"
            min="0"
            value={accompany || ""}
            onChange={(e) => setAccompany(e.target.value)}
          />
        </div>

        <div>
          <Label>{strings.rsvpLabel}</Label>
          <RadioGroup value={attendance} onValueChange={setAttendance}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes">Yes</RadioGroupItem>
              <Label htmlFor="yes">{strings.yesOption}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no">No</RadioGroupItem>
              <Label htmlFor="yes">{strings.noOption}</Label>
            </div>
          </RadioGroup>
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Sending..." : strings.submitButton}
        </Button>
      </form>
    </div>
  );
}
