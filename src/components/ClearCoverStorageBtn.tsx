"use client";

import clearCoverStorage from "@/app/functions/clearCoverStorage";

export default function ClearCoverStorageBtn() {
  return (
    <button
      className="text-2xl ml-10 bg-orange-600 w-64 my-auto text-center py-2
  rounded-lg border-slate-950 hover:scale-110"
      onClick={() => clearCoverStorage()}
    >
      Clear Covers Storage
    </button>
  );
}
