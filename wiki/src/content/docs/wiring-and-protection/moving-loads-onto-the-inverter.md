---
title: Moving house loads onto the inverter
description: How to separate the circuits your inverter will power, why live and neutral must both move, and what goes wrong with shared neutrals.
contributors: [Niyi Solar, bigbrovar, LifeofDan-EL]
discussed: June 2023, July 2024
sidebar:
  order: 1
---

*From posts by Niyi Solar, bigbrovar, LifeofDan-EL. Discussed in the group: June 2023, July 2024.*

**Should the inverter's loads be wired separately, or do you leave the wiring alone and just avoid switching on the heavy appliances?**

Separate them. LifeofDan-EL asked the group this in 2023, noting that the homes he had been in tended to separate the loads. Relying on people to remember not to switch on an air conditioner or pump is not protection.

:::danger
This is mains wiring. Get a qualified electrician to do it. This page is so you know what a correct job looks like and can check the work.
:::

## The correct way

Niyi Solar's method:

1. At the mains distribution board, identify every circuit you want the inverter to power.
2. For each of those circuits, identify **both** the live and the neutral wire. Moving the lives and leaving the neutrals behind is the most common mistake, and it is neither safe nor code compliant.
3. Move those lives and neutrals to a separate distribution point. The proper version is a separate, isolated board with its own RCCB and breakers.
4. Run two main cables, sized for your maximum load, from that board to the load side of a dedicated changeover switch: one live, one neutral.
5. Feed one side of the changeover from the inverter's AC output and the other side from the mains supply, live and neutral each to the correct terminal.

With the changeover in one position the selected circuits run from the inverter. In the other they run from mains. That gives you a clean way to bypass the inverter when you need to. In June 2023 a dedicated changeover switch cost under ₦5,000.

## Do not feed the inverter into one phase of the main board

A shortcut some installers use on a three phase board is to put the inverter loads on one phase and feed the inverter into it. Niyi Solar's objection: mixing different supplies inside one distribution board is not acceptable. If the isolation between phases fails, the two supplies clash and the inverter takes the damage. In his words, there is no jurisdiction where dropping one mains phase and feeding an inverter into it is code compliant.

## Why the inverter needs its own neutral

Sharing one neutral between the mains side and the inverter side has been removed from most recent electrical codes. Niyi Solar on what happens when you do it:

**With hybrid (mostly transformerless) inverters and older centre-tapped transformer inverters**, a shared neutral appears to work. The side effects:

- Your mains board can be live while the inverter is running, even when the grid is off.
- If live and neutral have been swapped anywhere on the mains side, you get a serious fault the moment the grid returns. This is what is happening when an inverter trips into an error each time mains comes back.

**With an inverter that isolates its transformer internally, such as a Victron**, do not link the neutrals at all:

- In the moments before the inverter accepts the grid, the system has two neutral-to-earth bonds. Fault current can flow, enough to overload the inverter or trip an RCD.
- Features such as ESS depend on clean isolation between the mains neutral and the inverter neutral.

**In any system**, a shared neutral can cause:

- Voltage feeding back to mains-only loads while the inverter runs.
- A shock for someone working on a circuit they believed was isolated.
- Constant nuisance tripping if you have an RCD or ELCB.

That last point explains why the practice survives. An installation with no safety devices seems to work fine with shared neutrals. Fit the safety devices a proper installation needs and the fault shows itself.
