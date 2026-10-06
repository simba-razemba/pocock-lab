// Summaries of ride rows: [{ date, city, rides }, ...] with rides as strings or numbers.

export function totalRides(rows) {
  return rows.reduce((sum, row) => sum + Number(row.rides), 0);
}

// Total rides per city, sorted by city name.
export function ridesByCity(rows) {
  const totals = new Map();
  for (const row of rows) {
    totals.set(row.city, (totals.get(row.city) ?? 0) + Number(row.rides));
  }
  return [...totals.entries()]
    .map(([city, rides]) => ({ city, rides }))
    .sort((a, b) => a.city.localeCompare(b.city));
}

// Total rides per calendar month (year + month, e.g. "2026-07"), sorted chronologically.
export function ridesByMonth(rows) {
  const totals = new Map();
  for (const row of rows) {
    const month = row.date.slice(0, 7);
    totals.set(month, (totals.get(month) ?? 0) + Number(row.rides));
  }
  return [...totals.entries()]
    .map(([month, rides]) => ({ month, rides }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Format a "YYYY-MM" key as "<Month name> <year>", e.g. "2026-07" -> "July 2026".
export function formatMonth(month) {
  const [year, monthNumber] = month.split("-");
  return `${MONTH_NAMES[Number(monthNumber) - 1]} ${year}`;
}
