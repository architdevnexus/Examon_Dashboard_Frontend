import RecentLiItem from "../RecentLiItem";

export default function RecentItemsCard({ item }) {
  const { title, data } = item;
  console.log(item);
  return (
    <div className="w-full px-3 py-2 bg-white rounded-xl hover:shadow-sm border border-gray-100 max-w-md">
      <h2 className="text-lg font-semibold mb-2">Recently Added {title}</h2>

      <ul className="space-y-3">
        {(!data || data.length === 0) && (
          <li className="text-gray-500 text-sm">No recent items available.</li>
        )}

        {data &&
          data
            .slice(0, 5)
            .map((itm) => (
              <RecentLiItem
                key={itm._id}
                itm={itm}
                title={title}
                link={item.link}
              />
            ))}
      </ul>
    </div>
  );
}
