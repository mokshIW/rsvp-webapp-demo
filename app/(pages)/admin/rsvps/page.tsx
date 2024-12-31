"use server";

import { getRSVPs } from "@/app/actions/getRSVPs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import RSVPTable from "@/app/_components/RSVPTable";
import { signOut } from "@/app/actions/auth";

export default async function RSVPsPage() {
  const { success, data, message } = await getRSVPs();

  // TODO: redirect to login if not authenticated
  if (!success) {
    return <div className="container mx-auto mt-8 p-4">Error: {message}</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All RSVPs</h1>
        <div className="flex items-center gap-2">
          <Link href={"/"}>
            <Button variant="outline">
              <House />
            </Button>
          </Link>

          {/* Logout */}
          <form action={signOut}>
            <Button variant={"outline"}>Sign Out</Button>
          </form>
        </div>
      </div>

      {/* Table */}
      <RSVPTable data={data || []} />
    </div>
  );
}
