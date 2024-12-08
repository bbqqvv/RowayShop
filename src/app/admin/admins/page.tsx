import Form from "./components/Form";
import ListView from "./components/ListView";

export default function Page() {
  return (
    <main className="flex gap-5">
      <Form />
      <ListView />
    </main>
  );
}
