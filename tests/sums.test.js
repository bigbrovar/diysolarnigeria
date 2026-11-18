// Copyright (C) 2026 bigbrovar. Licensed under the GNU General Public License, version 3. See LICENSE.
//
// Checks the calculator's sums against answers worked out by hand.
// Run with:  node --test tests/
//
// It reads the block between "sums:start" and "sums:end" in template.html, so it
// tests the same code the page runs. Nothing needs installing.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const page = fs.readFileSync(path.join(__dirname, "..", "template.html"), "utf8");
const block = page.match(/\/\* sums:start[^*]*\*\/([\s\S]*?)\/\* sums:end \*\//);
assert.ok(block, "template.html has lost its sums:start and sums:end markers");
const size = new Function(block[1] + "\nreturn size;")();

// The rules the page ships with. If you change a rule in data/calculator.yaml on
// purpose, the expected answers below need working out again.
const RULES = { inverterLoad: 0.8, batteryUse: 0.8, batteryLoss: 0.03, panelLosses: 0.75, panelWatts: 550, daysInMonth: 30 };
const item = (w, q, h) => ({ w, q, h });
const near = (got, want, label) =>
  assert.ok(Math.abs(got - want) < 1e-6, `${label}: expected ${want}, got ${got}`);

const everyday = [item(10, 8, 6), item(75, 3, 10), item(80, 1, 6), item(30, 1, 12), item(10, 2, 3), item(150, 1, 8)];

test("the list the page opens with", () => {
  const r = size(everyday, 209.5, 5.4, 0.5, RULES);
  near(r.watts, 585, "watts at once");
  near(r.day, 4.83, "kWh a day");
  near(r.month, 144.9, "kWh a month");
  near(r.cost, 30356.55, "grid cost a month");
  near(r.inverter, 0.73125, "inverter kW");
  near(r.night, 2.415, "kWh after sunset");
  near(r.battery, 3.01875, "battery kWh");
  near(r.refill, 2.415 / 0.97, "kWh to refill the battery");
  near(r.kwp, (2.415 + 2.415 / 0.97) / (5.4 * 0.75), "panel kWp");
  assert.equal(r.panels, 3);
});

test("adding a 1 HP air conditioner for 6 hours", () => {
  const r = size([...everyday, item(900, 1, 6)], 209.5, 5.4, 0.5, RULES);
  near(r.watts, 1485, "watts at once");
  near(r.day, 10.23, "kWh a day");
  near(r.inverter, 1.85625, "inverter kW");
  near(r.battery, 6.39375, "battery kWh");
  near(r.kwp, 2.5649867, "panel kWp");
  assert.equal(r.panels, 5);
});

test("mostly at night, with fewer sun hours", () => {
  const r = size([item(1000, 1, 10)], 63.35, 4.5, 0.7, RULES);
  near(r.day, 10, "kWh a day");
  near(r.night, 7, "kWh after sunset");
  near(r.daytime, 3, "kWh in the daytime");
  near(r.battery, 8.75, "battery kWh");
  near(r.inverter, 1.25, "inverter kW");
  near(r.make, 3 + 7 / 0.97, "kWh the panels must make");
  near(r.kwp, (3 + 7 / 0.97) / 3.375, "panel kWp");
  near(r.cost, 10 * 30 * 63.35, "grid cost a month");
  assert.equal(r.panels, 6);
});

test("more of them and more hours both add up", () => {
  const one = size([item(100, 1, 5)], 100, 5, 0.5, RULES);
  const four = size([item(100, 4, 5)], 100, 5, 0.5, RULES);
  near(four.watts, one.watts * 4, "watts");
  near(four.day, one.day * 4, "kWh a day");
  const longer = size([item(100, 1, 10)], 100, 5, 0.5, RULES);
  near(longer.watts, one.watts, "watts do not change with hours");
  near(longer.day, one.day * 2, "kWh a day");
});

test("a panel count that lands exactly on a whole number is not rounded up", () => {
  // 330 W for 10 hours, all in the daytime, on 4 sun hours: exactly 1.1 kWp, which is 2 panels.
  const r = size([item(330, 1, 10)], 0, 4, 0, RULES);
  near(r.kwp, 1.1, "panel kWp");
  assert.equal(r.panels, 2);
});

test("nothing ticked gives zeros, not errors", () => {
  const r = size([], 209.5, 5.4, 0.5, RULES);
  assert.equal(r.n, 0);
  for (const key of ["watts", "day", "month", "cost", "inverter", "battery", "kwp", "panels"]) {
    assert.equal(r[key], 0, key);
  }
});

test("a higher price changes the cost and nothing else", () => {
  const cheap = size(everyday, 33.95, 5.4, 0.5, RULES);
  const dear = size(everyday, 209.5, 5.4, 0.5, RULES);
  assert.ok(dear.cost > cheap.cost);
  for (const key of ["watts", "day", "inverter", "battery", "kwp", "panels"]) {
    assert.equal(dear[key], cheap[key], key);
  }
});
