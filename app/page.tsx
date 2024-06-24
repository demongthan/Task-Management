import { Tasks } from "@/components";
import CreateContent from "@/components/CreateContent";
import React from "react";

export default function Home() {
  return (
    <main className="w-full h-full">
      {/* <CreateContent></CreateContent> */}
      <Tasks title="All Tasks"></Tasks>
    </main>
  );
}
