export default function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {Array.from({ length: columns }).map((_, col) => (
            <td key={col} className="py-3 px-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
