import Link from "next/link";
import ListView from "./components/ListView";
import { ToastContainer } from "react-toastify";

export default function Page() {
  return (
    <main className="flex flex-col gap-6 p-6 mt-5">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link
          href="/admin/products/form"
          className="bg-gray-800 text-sm text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
        >
          Create
        </Link>
      </div>

      {/* List View Section */}
      <section>
        <ListView />
      </section>
      <ToastContainer />

    </main>
  );
}
