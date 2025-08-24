"use client";

import Form from "@/components/Form";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Validation Form with Zod and React Hook Form</h1>
        <h2 className="text-xl font-bold text-center">Fill the form</h2>
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start shadow-lg p-8 rounded-lg">
        <Form />
      </main>
    </div>
  );
}
