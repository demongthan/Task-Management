import { Tasks } from "@/components";
import { GlobalContextProps, useGlobalState } from "@/context/GlobalProvider";
import React from "react";

export default function Home() {
  return (
    <main className="w-full h-full">
      {/* <CreateContent></CreateContent> */}
      <Tasks title="All Tasks"></Tasks>
    </main>
  );
}
