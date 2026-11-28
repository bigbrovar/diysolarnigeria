---
title: Getting the most from tubular batteries
description: The limits of tubular batteries, how to design around them, why new ones disappoint, and why not to mix them with lithium.
contributors: [bigbrovar, Niyi Solar, AshipaEk0]
discussed: March 2023, July 2023, August 2023, May 2024, June 2024, April 2026
sidebar:
  order: 2
---

*From posts by bigbrovar, Niyi Solar, AshipaEk0. Discussed in the group: March 2023, July 2023, August 2023, May 2024, June 2024, April 2026.*

**Tubular batteries are what many people can afford. How do you make them last?**

Many members started on tubular batteries before moving to lithium. bigbrovar's view is that understanding their limits lets you design around them.

## The limits

| Limit | Figure | What it means |
|---|---|---|
| Depth of discharge | 50% | Use only half the capacity. Going deeper shortens the life. |
| Discharge rate | Capacity ÷ 20 | A 200 Ah battery is designed to deliver 10 A. Draw more and you get less than 200 Ah out of it. |
| Charge rate | 10% to 15% of capacity | See [Charging tubular batteries](/wiki/tubular-batteries/charging-tubular-batteries/). |
| Charge efficiency | About 85% | Roughly 15% of what you put in is lost, so the panels must produce more than you used. |
| Real capacity | Less than the label | bigbrovar took 20 Ah off the stated figure, sometimes 50 Ah. |

The discharge rate is the one people miss. Four 200 Ah batteries at 48 V are designed for about 480 to 500 W of continuous load. A 1 hp air conditioner uses all of that by itself. bigbrovar's verdict: nothing kills a tubular bank faster than running an air conditioner from it.

## How to design around them

bigbrovar's approach when he ran tubular batteries:

1. **Do an energy audit.** Know what each appliance uses and for how long. His own example on a 24 V, 220 Ah bank, which he treated as 180 Ah:

   | Load | Use | Energy |
   |---|---|---|
   | Three 5 W LED bulbs | 8 hours | 120 Wh |
   | 15 W fan | 10 hours | 150 Wh |
   | 40 W laptop | 10 hours | 400 Wh |
   | 30 W TV | 10 hours | 300 Wh |
   | 150 W freezer | 6 hours | 900 Wh |
   | **Total** | | **1,870 Wh, rounded to 2,000 Wh** |

   2,000 Wh ÷ 24 V is about 83 Ah, which he rounded up to 90 Ah. That is half of 180 Ah, right at the 50% limit.

2. **Run heavy loads in the afternoon.** Fridges, freezers and other heavy appliances go on while the sun is strong. They use solar power directly and they keep the charge current into the battery at a safe level.

3. **Keep nights light.** DC fans, LED bulbs and an LED TV. A well planned night load can be under 200 W. His battery was still at 65% to 70% in the morning.

4. **Let the battery fill early.** A battery that starts the day at 70% reaches the absorption stage by mid-morning, before the panels hit their midday peak. That is how he ran an oversized array without ever pushing its full output into the battery.

5. **Size the panels for the refill.** The panels have to put back what you used, plus the 15% charging loss, on a poor day. He plans on 70% of the panels' rated output and 3 to 4 sun hours.

His advice to a member asking about remote monitoring for a struggling tubular system was to fix the balance first. Monitoring shows you the problem, it does not solve it, and the money is often better spent on another panel.

## Reading the voltage

Tubular battery voltage drops a lot under load, and that worries people unnecessarily. bigbrovar's guide:

- A full battery taken off charge and put under load can fall to 12.4 V within 30 minutes. That is normal.
- It can stay above 12 V until about 55% full, then drop towards 11.6 V.
- Below 12 V under load does not mean the battery is failing. It is the voltage under that load.
- The only voltage that tells you the state of charge is the resting voltage: disconnect all chargers and loads and let the battery settle for about 4 hours before measuring.

This is also why a low-voltage cut-off can mislead. Depending on your loads, 11.5 V to 11.8 V under load may be a fair picture of 50% discharged.

## Why a new tubular battery can disappoint

bigbrovar's explanation of the supply chain:

- The batteries are shipped dry from India, which takes three to four months, and are filled with electrolyte in Nigeria.
- The electrolyte is a precise mix of sulphuric acid and distilled water. Many sellers lack the equipment to mix it accurately or to produce distilled water in quantity. He has seen sellers use water collected from air conditioners, and heard of borehole water.
- Once filled, a lead acid battery must be kept charged. Instead it sits in a hot warehouse, then with a sub-dealer, then a retailer, self-discharging for months.

The result is a battery sold as new that may already be sulphated, with electrolyte that is too weak or too strong.

## Adding a new battery to an old bank

AshipaEk0's caution: when a new tubular battery is paralleled with an older one, the older battery usually stops the new one from reaching a full charge. The pair behaves like two old batteries.

## Do not mix tubular with lithium

Can it be done? Niyi Solar: yes, with caveats. Should you? Not advisable. To do it safely you would need to:

1. Connect the two banks only when both are fully charged.
2. Disconnect the tubular bank automatically at about 50% discharge, using a battery sensing relay and a good DC contactor.
3. Limit the charge rate to what the tubular bank can take.

His reasons not to:

- Lithium has lower resistance, so it supplies most of the current under load. On charge, more current can flow into the tubular bank than it can handle. It can run hot and rupture.
- Without a reliable disconnect, the tubular bank is discharged as deeply as the lithium, which wrecks it.
- Limiting the charge rate to protect the tubular bank wastes the lithium bank's ability.
- The charge voltage tubular batteries need, including periodic equalisation, is too high for lithium.

His recommendation is to run lithium by itself and repurpose, donate or scrap the tubular bank.

:::danger
Niyi Solar has had tubular batteries explode twice in his career, both times with no warning sign beforehand, throwing acid everywhere. Wear safety goggles whenever you work on a battery bank.
:::
