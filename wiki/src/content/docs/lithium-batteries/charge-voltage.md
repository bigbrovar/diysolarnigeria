---
title: What voltage to charge LiFePO4 cells to
description: Why many members charge LiFePO4 below the maximum, the settings they use, and where they disagree.
contributors: [bigbrovar, Niyi Solar]
discussed: April 2024
sidebar:
  order: 1
---

*From posts by bigbrovar, Niyi Solar. Discussed in the group: April 2024.*

**The cell maker says 3.65 V per cell. Why do experienced members charge to less?**

## The short answer

A LiFePO4 cell works between about 2.5 V (empty) and 3.65 V (full), but the curve is very flat in the middle and steep at the ends. bigbrovar's summary: at 3.5 V the cell is already about 98% full. The last 0.15 V adds roughly 2% of capacity, and that top end is where the cell is most stressed. Stopping at 3.5 V or a little below gives up a negligible amount of capacity for a longer life.

## What members actually use

| Member | Charge voltage per cell | Other settings |
|---|---|---|
| bigbrovar | 3.48 V (previously 3.52 V) | Disconnect at 3.0 V per cell. He treats this as using about 80% of capacity. |
| Niyi Solar | 3.43 V to 3.45 V | 2 hour absorption. Active balancer on at 3.42 V and off at 3.375 V. |

For a 16-cell (48 V) battery, 3.45 V per cell is 55.2 V and 3.48 V per cell is 55.7 V.

Niyi Solar's point is that there is no single ideal charge voltage. What matters is the combination of three settings, chosen with your long-term goal in mind:

1. Charge voltage
2. Absorption time
3. When the balancer switches on and off

His other figures:

- With a passive balancer, switching on at 3.45 V works. Some professionals he respects start at 3.42 V.
- Target a cell voltage difference of 10 to 15 mV for large prismatic cells (280 Ah).
- For poor quality cells, a looser 30 mV target has given people better stability.
- If you want to stop short of full, charge a 16-cell pack to about 54 V (3.375 V per cell). Conventional wisdom is that a cell cannot reach full below about 3.4 V.

## Voltage, not percentage

Niyi Solar: state of charge is an approximation for people. Voltage is what drives the chemical reactions that store energy, and there are voltages at which harmful reactions begin. Charging is a chemical process driven by voltage. An aggressive charge profile is why the same battery can show a different apparent capacity on different days.

He adds that LiFePO4 does not like to sit fully charged for long periods. Where the grid is nearly always available and the battery is really a backup, he sets the target below 3.45 V per cell.

## Does charging lower really make cells last longer?

Members do not agree, and bigbrovar set out both camps:

- **Use the full range.** Cells will die of age anyway. An EVE 280 Ah cell is rated for 6,500 cycles from 0 to 100% at 0.5C. At one cycle a day that is about 17 years, and it still has 80% of its capacity afterwards. Being gentle may not add anything beyond that.
- **Be conservative.** Charge to about 3.45 V and hope to extend the life by reducing stress.

His own position is in between, and it turns on heat. LiFePO4 is designed for about 27°C, and one cell engineer he cites puts serious capacity loss above roughly 45°C. In a Nigerian battery room at 35 to 40°C he charges gently. In a cool or air-conditioned room he would charge up to 3.6 V.

Two more points from him:

- Unlike lead acid, lithium is not harmed by sitting partly charged. Charging below full has no downside beyond the small capacity you give up.
- Charge rate matters too. Keep charge and discharge below 0.5C, which is 140 A for a 280 Ah cell.

## Cells swell if they are not compressed

Niyi Solar's warning to people who charge hard: some prismatic cells expand when charged and contract when discharged, and that repeated movement can take around 1,000 cycles off their life. It also strains the terminals and internal connections.

Manufacturers recommend clamping the cells in a fixture, assembled at about 50% state of charge. He noticed the effect himself when top balancing his first set: the cells visibly shifted when he loosened the busbars. Many local pack builders skip compression. The Chinese pack builders all use some form of it.
