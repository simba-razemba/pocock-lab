import { test } from "node:test";
import assert from "node:assert/strict";
import { totalRides, ridesByCity, ridesByMonth, formatMonth } from "../site/src/stats.js";

const rows = [
  { date: "2026-07-01", city: "Miami", rides: "10" },
  { date: "2026-07-01", city: "Boston", rides: "20" },
  { date: "2026-07-02", city: "Boston", rides: 30 },
];

const multiMonthRows = [
  { date: "2026-07-01", city: "Miami", rides: "10" },
  { date: "2026-08-15", city: "Boston", rides: "20" },
  { date: "2026-08-20", city: "Boston", rides: 30 },
];

test("totalRides sums the rides column", () => {
  assert.equal(totalRides(rows), 60);
});

test("ridesByCity totals per city in alphabetical order", () => {
  assert.deepEqual(ridesByCity(rows), [
    { city: "Boston", rides: 50 },
    { city: "Miami", rides: 10 },
  ]);
});

test("ridesByMonth totals per year-month in chronological order", () => {
  assert.deepEqual(ridesByMonth(multiMonthRows), [
    { month: "2026-07", rides: 10 },
    { month: "2026-08", rides: 50 },
  ]);
});

test("formatMonth renders a YYYY-MM key as a month name and year", () => {
  assert.equal(formatMonth("2026-07"), "July 2026");
  assert.equal(formatMonth("2026-12"), "December 2026");
});
