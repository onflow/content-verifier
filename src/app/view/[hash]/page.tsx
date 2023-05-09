"use client";

import { DisplayContent } from "@/app/components/DisplayContent";

export default function View({ params }: { params: { hash: string } }) {
  const { hash } = params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DisplayContent hash={hash} />
    </main>
  );
}
