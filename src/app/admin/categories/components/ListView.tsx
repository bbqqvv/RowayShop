"use client"
export default function ListView() {
  const categories = [
    { id: 1, name: "Electronics", image: "/images/electronics.jpg" },
    { id: 2, name: "Clothing", image: "/images/clothing.jpg" },
    { id: 3, name: "Home Appliances", image: "/images/home-appliances.jpg" },
  ];

  return (
    <main className="bg-white p-6 rounded-xl flex flex-col gap-6 shadow-lg flex-1">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">List Categories</h1>

      </div>

      {/* Table */}
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
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className="border-b hover:bg-gray-50">
                {/* STT */}
                <td className="px-6 py-4 text-center">{index + 1}</td>

                {/* Image */}
                <td className="px-6 py-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-4 font-medium text-gray-800">
                  {category.name}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                      onClick={() => console.log(`Editing ${category.name}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      onClick={() => console.log(`Deleting ${category.name}`)}
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
    </main>
  );
}
