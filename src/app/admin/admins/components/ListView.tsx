"use client";

interface Admin {
  id: number;
  name: string;
  email: string;
  image: string;
}

export default function ListView() {
  const admins: Admin[] = [
    {
      id: 1,
      name: "John Doe",
      email: "exam@gmail.com",
      image: "/images/electronics.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "exam@gmail.com",
      image: "/images/clothing.jpg",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "exam@gmail.com",
      image: "/images/home-appliances.jpg",
    },
  ];

  // Hàm hiển thị header
  const renderHeader = () => (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold">List Admins</h1>
    </div>
  );

  // Hàm hiển thị bảng
  const renderTable = () => (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full bg-white text-sm text-left text-gray-500">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              mail
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id} className="border-b hover:bg-gray-50">
              {/* Số thứ tự */}
              <td className="px-6 py-4 text-center">{index + 1}</td>

              {/* Hình ảnh */}
              <td className="px-6 py-4">
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="h-10 w-10 rounded-md object-cover"
                />
              </td>

              {/* Tên */}
              <td className="px-6 py-4 font-medium text-gray-800">
                {admin.name}
              </td>
              {/* Tên */}
              <td className="px-6 py-4 font-medium text-gray-800">
                {admin.email}
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                    onClick={() => console.log(`Editing ${admin.name}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    onClick={() => console.log(`Deleting ${admin.name}`)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Hàm hiển thị trạng thái rỗng
  const renderEmptyState = () => (
    <div className="py-10 text-center text-gray-500">
      <p>No admins available.</p>
    </div>
  );

  return (
    <main className="bg-white p-6 rounded-xl flex flex-col gap-6 shadow-lg flex-1">
      {/* Header */}
      {renderHeader()}

      {/* Table hoặc trạng thái rỗng */}
      {admins.length > 0 ? renderTable() : renderEmptyState()}
    </main>
  );
}
