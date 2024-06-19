import Tasks from "@/components/Tasks";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Tasks title="All Tasks" tasks={[]}></Tasks>
    </main>
  );
}
