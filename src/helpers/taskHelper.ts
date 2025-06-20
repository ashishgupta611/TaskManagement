export const statusColors = {
  Open: "text-blue-400 group-hover:text-blue-600",
  "In-Progress": "bg-yellow-100 text-yellow-800",
  "Under-review": "bg-purple-100 text-purple-800",
  Rejected: "bg-orange-100 text-purple-800",
  Cancelled: "bg-red-100 text-purple-800",
  Done: "bg-green-100 text-green-800",
} as const;

export const priorityColors = {
  Low: "bg-gray-100 text-gray-800",
  Medium: "bg-orange-100 text-orange-800",
  High: "text-red-300 group-hover:text-red-400",
} as const;