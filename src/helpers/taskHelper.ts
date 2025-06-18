export const statusColors = {
  Open: "bg-blue-100 text-blue-800",
  "In-Progress": "bg-yellow-100 text-yellow-800",
  "Under-review": "bg-purple-100 text-purple-800",
  Done: "bg-green-100 text-green-800",
} as const;

export const priorityColors = {
  Low: "bg-gray-100 text-gray-800",
  Medium: "bg-orange-100 text-orange-800",
  High: "bg-red-100 text-red-800",
} as const;