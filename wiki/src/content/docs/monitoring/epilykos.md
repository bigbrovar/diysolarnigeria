---
title: "Recommended: Epilykos"
description: Epilykos is a free, self-hosted monitoring dashboard built by group member AshipaEk0. What it does, what it supports and how to install it.
contributors: [AshipaEk0, bigbrovar]
discussed: October 2024, April 2026 to November 2026
sidebar:
  order: 2
  label: Epilykos (recommended)
---

*From posts by AshipaEk0, bigbrovar, and the Epilykos documentation. Discussed in the group: October 2024, April 2026 to November 2026.*

**Which monitoring system does the group recommend?**

[Epilykos](https://epilykos.ashipaek0.com.ng/), built by group member AshipaEk0. It is a dashboard for solar systems, batteries and smart homes that runs on your own hardware and keeps your data in your house.

It is free and open source, under the GPL version 3 licence.

## Why this one

- **It is built by someone in the group.** You can ask AshipaEk0 questions, report bugs and request features directly, and he asks members for feedback on new versions.
- **It covers equipment common in the group.** The supported list includes Growatt and Felicity dongles and Voltronic type inverters.
- **bigbrovar's view:** what he likes most is the architecture. In his words the service is well built, with very good security.
- **Your data stays local.** There is no outside server between you and your inverter.

## What it connects to

From the Epilykos documentation:

| Type | Examples |
|---|---|
| Inverter Wi-Fi dongles | Solarman V5, LuxPower, Growatt, Felicity |
| Modbus | Over RS-485 or the network |
| RS232 inverters | Voltronic, Victron VE.Direct, SolaX, Phocos |
| Battery BMS | Over Bluetooth or a cable |
| Other sources | Home Assistant, MQTT, Tuya devices, any web service that returns JSON |

Check the [supported hardware page](https://epilykos.ashipaek0.com.ng/data-sources/supported-hardware) for your exact model.

Several lithium packs can be added and combined so they show as one battery bank.

## What you get

- Dashboards you can edit, with a ready-made default in light and dark mode so you do not start from a blank page
- Live readings, history and charts
- Alerts by push notification, Telegram and other channels
- Solar forecasts and savings tracking
- Remote access through Tailscale or a Cloudflare Tunnel
- Device setting controls, with safety checks
- Encrypted backups

## How to install it

| Option | Best for | Guide |
|---|---|---|
| EpilykosOS on a Raspberry Pi | Most people. Flash a memory card and finish setup in the browser. | [Install on a Raspberry Pi](https://epilykos.ashipaek0.com.ng/getting-started/install-epilykos-os) |
| Docker | Anyone who already runs a home server, mini PC or NAS | [Install with Docker](https://epilykos.ashipaek0.com.ng/getting-started/install-docker) |
| Windows installer (beta) | A Windows PC that stays on | [Install on Windows](https://epilykos.ashipaek0.com.ng/getting-started/install-windows) |

You still need a way to connect to your inverter or battery. See [How to monitor your inverter and battery](/wiki/monitoring/how-to-monitor-your-system/) for the hardware.

There are video walkthroughs in the [Epilykos playlist on YouTube](https://youtube.com/playlist?list=PLJC5map7t7-Q).

## If your inverter is not supported

Epilykos reads each inverter from a profile file, and you can add your own. AshipaEk0's outline:

1. Copy the closest existing profile and rename it.
2. Set the name and connection type.
3. List the inverter's registers: for each reading, its address, type, scale, unit and label. Reuse the standard reading names, such as `grid_power` and `battery_voltage`, so the dashboard cards work without changes.
4. Test it, add the device in Settings, and check the values against the inverter's own display.

With the inverter's register document in hand he puts it at about 30 minutes of work, mostly testing. The full steps are in [Add your inverter](https://epilykos.ashipaek0.com.ng/development/add-your-inverter).

If you get a new inverter working, share your files with him so it can be included for everyone.

## Links

- Documentation: [epilykos.ashipaek0.com.ng](https://epilykos.ashipaek0.com.ng/)
- Source code: [github.com/ashipaek0/Epilykos](https://github.com/ashipaek0/Epilykos)

:::note
Epilykos changes quickly. The features and supported hardware listed here were checked against its documentation in November 2026. Its own site is the up to date source.
:::
