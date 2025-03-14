"use client";
import Image from 'next/image';

interface Admin {
  id: number;
  name: string;
  email: string;
  image: string;
}

const adminList: Admin[] = [
  { id: 1, name: "John Doe", email: "exam@gmail.com", image: "/images/electronics.jpg" },
  { id: 2, name: "Jane Smith", email: "exam@gmail.com", image: "/images/home-appliances.jpg" },
  { id: 3, name: "Sarah Johnson", email: "exam@gmail.com", image: "/images/clothing.jpg" },
];

const ListAdmins = () => {
  const renderEmptyState = () => (
    <div className="py-10 text-center text-gray-500">
      No admins found.
    </div>
  );

  return (
    <main className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
      {/* Header */}
      <div className="text-xl font-semibold border-b pb-4">List Admins</div>

      {/* Table or Empty State */}
      {adminList.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminList.map((admin, index) => (
                <tr key={admin.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">
                    <Image
                      src={admin.image || "/default-image.jpg"}
                      alt={admin.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                      onError={(e) => (e.currentTarget.src = "/default-image.jpg")}
                    />
                  </td>
                  <td className="py-4 px-4 font-medium">{admin.name}</td>
                  <td className="py-4 px-4 font-medium">{admin.email}</td>
                  <td className="py-4 px-4 text-center">
                    <button className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition">
                      ✏ Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      onClick={() => console.log("Delete admin", admin.name)}
                    >
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        renderEmptyState()
      )}
    </main>
  );
};

export default ListAdmins;
