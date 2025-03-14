import { ToastContainer } from "react-toastify";
import Orders from "./components/Orders";
import Profile from "./components/Profile";

export default function Page() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="p-5 flex justify-center">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-6">
            <Profile />
          </div>
          <div>
            <Orders />
          </div>
        </div>
      </main>
    </>
  );
}